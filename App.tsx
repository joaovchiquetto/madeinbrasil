
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { RSVPForm } from './components/RSVPForm';
import { GuestList } from './components/GuestList';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { Guest } from './types';

const App: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [wallpaper, setWallpaper] = useState<string | null>(null);

  useEffect(() => {
    const savedGuests = localStorage.getItem('made_in_brasil_guests');
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests));
    } else {
      const sample: Guest[] = [
        { id: '1', mainName: 'João da Silva', additionalGuests: ['Maria das Dores'], totalCount: 2, timestamp: new Date().toISOString() },
        { id: '2', mainName: 'Zeca Pagodinho', additionalGuests: [], totalCount: 1, timestamp: new Date().toISOString() }
      ];
      setGuests(sample);
      localStorage.setItem('made_in_brasil_guests', JSON.stringify(sample));
    }

    const savedWallpaper = localStorage.getItem('made_in_brasil_wallpaper');
    if (savedWallpaper) {
      setWallpaper(savedWallpaper);
    }
  }, []);

  const handleAddGuest = (newGuest: Guest) => {
    const updated = [newGuest, ...guests];
    setGuests(updated);
    localStorage.setItem('made_in_brasil_guests', JSON.stringify(updated));
    
    const element = document.getElementById('guest-list-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRemoveGuest = (idToRemove: string) => {
    // Atualiza a lista removendo aquele ID específico
    setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== idToRemove));
  };

  const handleWallpaperChange = (imageUrl: string) => {
    setWallpaper(imageUrl);
    localStorage.setItem('made_in_brasil_wallpaper', imageUrl);
  };

  const removeWallpaper = () => {
    setWallpaper(null);
    localStorage.removeItem('made_in_brasil_wallpaper');
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
          <GuestList 
          guests={guests} 
          onRemoveGuest={handleRemoveGuest} 
        />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
