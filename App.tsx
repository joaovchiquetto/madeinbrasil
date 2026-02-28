// App.tsx
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { GuestList } from './components/GuestList';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { Guest } from './types';

// NOVO: Adicionamos o setDoc para salvar as configurações
import { collection, onSnapshot, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const App: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  useEffect(() => {
    // Escuta os convidados em tempo real
    const unsubscribeGuests = onSnapshot(collection(db, 'guests'), (snapshot) => {
      const guestsData: Guest[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Guest));
      
      guestsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setGuests(guestsData);
    });

    // NOVO: Escuta o papel de parede em tempo real do banco de dados!
    // Ele olha para a coleção "configuracoes", no documento "aparencia"
    const unsubscribeWallpaper = onSnapshot(doc(db, 'configuracoes', 'aparencia'), (docSnap) => {
      if (docSnap.exists()) {
        setWallpaper(docSnap.data().wallpaperUrl || null);
      } else {
        setWallpaper(null);
      }
    });

    // Quando o componente for desmontado, paramos de escutar ambos
    return () => {
      unsubscribeGuests();
      unsubscribeWallpaper();
    };
  }, []);

  const handleAddGuest = async (newGuest: Guest): Promise<boolean> => {
    try {
      const normalizeName = (str: string) => 
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

      const isDuplicate = guests.some(
        (g) => normalizeName(g.mainName) === normalizeName(newGuest.mainName)
      );

      if (isDuplicate) {
        return false; 
      }

      await addDoc(collection(db, 'guests'), {
        mainName: newGuest.mainName,
        additionalGuests: newGuest.additionalGuests,
        totalCount: newGuest.totalCount,
        timestamp: newGuest.timestamp
      });
      
      const element = document.getElementById('guest-list-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      return true; 
      
    } catch (error) {
      console.error("Erro ao salvar convidado:", error);
      alert("Ops! Houve um erro ao conectar com o servidor. Tente novamente.");
      return false;
    }
  };

  const handleRemoveGuest = async (idToRemove: string) => {
    try {
      await deleteDoc(doc(db, 'guests', idToRemove));
    } catch (error) {
      console.error("Erro ao remover convidado:", error);
    }
  };

  // NOVO: Agora salva o papel de parede na nuvem (Firestore)
  const handleWallpaperChange = async (imageUrl: string) => {
    // Atualiza a tela imediatamente para você ter um feedback visual
    setWallpaper(imageUrl);
    
    try {
      // Salva no banco de dados na coleção "configuracoes", documento "aparencia"
      await setDoc(doc(db, 'configuracoes', 'aparencia'), { 
        wallpaperUrl: imageUrl 
      }, { merge: true }); // O merge: true garante que não vai apagar outros dados se houver
    } catch (error) {
      console.error("Erro ao salvar papel de parede na nuvem:", error);
      alert("Erro ao salvar a imagem. Ela pode ser muito pesada para o banco de dados (o limite é 1MB). Tente uma imagem com tamanho menor.");
    }
  };

  // NOVO: Remove o papel de parede da nuvem
  const removeWallpaper = async () => {
    setWallpaper(null);
    try {
      await setDoc(doc(db, 'configuracoes', 'aparencia'), { 
        wallpaperUrl: null 
      }, { merge: true });
    } catch (error) {
      console.error("Erro ao remover papel de parede na nuvem:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] selection:bg-yellow-200">
      <Header 
        wallpaper={wallpaper}
        onWallpaperChange={handleWallpaperChange} 
        onRemoveWallpaper={removeWallpaper} 
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-12 sm:-mt-20 md:-mt-24 relative z-20">
        <section id="countdown-section" className="mb-10 sm:mb-16">
          <Countdown targetDate="2026-04-04T16:30:00" />
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10">
          <section id="rsvp-section" className="lg:col-span-6 xl:col-span-5 order-2 lg:order-1">
            <RSVPForm onConfirm={handleAddGuest} />
          </section>
          
          <section id="location-section" className="lg:col-span-6 xl:col-span-7 order-1 lg:order-2">
            <LocationSection />
          </section>
        </div>

        <section id="guest-list-section" className="mt-16 sm:mt-24">
          <GuestList guests={guests} onRemoveGuest={handleRemoveGuest} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;