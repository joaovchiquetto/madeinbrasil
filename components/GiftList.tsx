import React, { useState } from 'react';

interface GiftItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageUrl: string;
  qrCodeUrl: string; // URL da imagem do seu QR Code PIX
  pixKey: string;    // Sua chave PIX
}

export const GiftList: React.FC = () => {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);

 // Dados de exemplo - Adicione seus QR Codes e chaves aqui
  const gifts: GiftItem[] = [
    { 
      id: '1', 
      name: 'Aguardando a Festa', 
      price: 'R$ 90,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcndzcjBzcGZ6OWp3Z2h6MjRqM3ppNDFnZzF2bDllZ3IyZWFoaHp0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QBd2kLB5qDmysEXre9/giphy.gif',
      qrCodeUrl: '\qr 90 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540590.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289039187346304648A'
    },
    { 
      id: '2', 
      name: 'Isso, Isso, Isso', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWttenYweWJndnY3eDdsZnBnNHVhdGx6azB1bW13dmY0Y3ZwbHUxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/A0HP0gX1w4I711ZWX6/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '3', 
      name: 'Rumo ao Hexa', 
      price: 'R$ 66,66', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXRxdnVwcGZieHAxZjl6Mzd1NGRzc2wwbW10ZWNuaXFlOGdzeDd6dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tkzfoxijYuxNK/giphy.gif',
      qrCodeUrl: '\qr 66,66 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540566.665802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr493928903512232630427B2'
    },
    { 
      id: '4', 
      name: 'Isso é coisa de Computador', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJieWp0aGxhemxmNDZ0NTY0NmhkcWFpdjZsa2Zna3d6a3ljYmlzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eY3gojbhEcPRu/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '5', 
      name: 'Fechando as Contas', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzV1MWN2dzNsenA1ajRzYXF2N285Y3RuaGl2M2U0cnE2YzIyd2YxZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/WRQBXSCnEFJIuxktnw/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '6', 
      name: 'Eu sou Rica!', 
      price: 'R$ 300,00', 
      quantity: 10, 
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3E3OTFpd3NpdzF6MGpsbHFzMWQzNDRmZzdmOGJyNjZhZ2E5anY1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/tSBskFBwQim0U/giphy.gif',
      qrCodeUrl: '\qr 300 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com5204000053039865406300.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289033930186304B878'
    },
    { 
      id: '7', 
      name: 'Partiu Festa', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGVwNDFpeTJ5ZXo4MHN0N2tsNDJhYXVyaXdiYTNlZm12bmphMjk3ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g5DAs9KMf0TEiY7bCB/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '8', 
      name: 'Play na Festa', 
      price: 'R$ 90,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzJ3dnQwd2xjZjl3ajYxNGJ1c2MzdXFsa2ZpaWMzbXR1ZzlqcnF3NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BLEQccMNimcWj0lkTh/giphy.gif',
      qrCodeUrl: '\qr 90 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540590.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289039187346304648A'
    },
    { 
      id: '9', 
      name: 'Prestigiando o Buffet', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDhpc3hmczlnOWxrNnU5bXowYWhzamdubDdpZ3pibm43Y2JscjFwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14h8jTg3oRgKMo/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    
    { 
      id: '10', 
      name: 'Curtindo a Festa', 
      price: 'R$ 90,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXdkeGhybmZ3MmN0d2M4a3FtYzBxcTJnNXllcnVreG80dzRqaXJ5bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k1Psl92gw7YPSPYFKm/giphy.gif',
      qrCodeUrl: '\qr 90 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540590.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289039187346304648A'
    },
    { 
      id: '11', 
      name: 'Um brinde à Vida', 
      price: 'R$ 150,00', 
      quantity: 10, 
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnBoZTNhYjM5ZTh4cGR5cWE1bHJjdmNoNW9lN2t2YnR5NGY4NXVtMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/W0E8iMqMDemxI0q24K/giphy.gif',
      qrCodeUrl: '\qr 150 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com5204000053039865406150.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289035707256304BAF7'
    },
    { 
      id: '12', 
      name: 'Dança gatinho, Dança', 
      price: 'R$ 90,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTkzZm0yc3BhemkyejBwNDIzZHY1MXF6MjZ2YXYxYjh4MTB3ZHgxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d6JOz84YUCkRWONeKN/giphy.gif',
      qrCodeUrl: '\qr 90 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540590.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289039187346304648A'
    },
    { 
      id: '13', 
      name: 'Cantando Parabéns', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGhmbXVycmowNXM0bHFncm0zcTFyNnRpY3UzOHVtajN4OGhrNnV0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kbWj40AJZgJcCGZGxq/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '14', 
      name: 'Eu vou tomar um Tacacá', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnA1ZHc4b3h4NTNkZTk4MHU5NjNyajN3bXRjaTNmd3d2anVqb2lseSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l1J9Rwvo00MRAgWVG/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '15', 
      name: 'Gratidão', 
      price: 'R$ 120,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHRjcWtlb28wN3pzcDhnbzFyOGxuaW1ibDdsNmZzenF4NGpqcTA4NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xMXIMmME83JqzYxga6/giphy.gif',
      qrCodeUrl: '\qr 120 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com5204000053039865406120.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr493928903670386630484E7'
    },
    { 
      id: '16', 
      name: 'Boa noite', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHZqNWpneDBsa2s0OGw4dzZucjBtN3pub3cxZGxvamRsenczNWsyNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/H3GA54toeCMYUjaKAT/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '17', 
      name: 'Acordei assim', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExajhtOHAyYzdrYWg3ZDQzazhid3M5OHE3bHB1MnNsYjN1MGVnc2UwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/gHiofhfMiuIs5a0zRA/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
    { 
      id: '18', 
      name: 'O Brasil ta lascado', 
      price: 'R$ 60,00', 
      quantity: 10, 
      imageUrl: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZm1sejBkNXlvajRheDkwZzd5eXhpeWUycGFjdnhjcTZ3OTc2ZnhtZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vwFtwXKsRea1F0n73p/giphy.gif',
      qrCodeUrl: '\qr 60 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540560.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289032996716304FB12'
    },
    { 
      id: '19', 
      name: 'Álbum da Festa', 
      price: 'R$ 100,00', 
      quantity: 10, 
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHZpajQ1enFlNWQwazd1bXc5bG56dHJuaWE3NTllZnQyOTM2ZWdlZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/39lTbUJWfTKCKALv52/giphy.gif',
      qrCodeUrl: '\qr 100 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com5204000053039865406100.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289034124076304955F'
    },
    { 
      id: '20', 
      name: 'Eu depois do Rolê', 
      price: 'R$ 80,00', 
      quantity: 10, 
      imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3o2eGJ3N2Q5NDV1Z3loaWo5ZmFmaDZvdTMybmt4Ynk1YzQ5dDFlYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/NQoU9ztPeTDzWyQmy4/giphy.gif',
      qrCodeUrl: '\qr 80 reais.jpeg',
      pixKey: '00020126460014br.gov.bcb.pix0124joaovchiquetto@gmail.com520400005303986540580.005802BR5920Joao Vitor Chiquetto6009Sao Paulo62230519daqr4939289031110646304F7B8'
    },
  ];
  // Função para copiar o código Pix
  const handleCopyPix = (code: string) => {
    navigator.clipboard.writeText(code);
    alert("Código Pix copiado! Agora abra o app do seu banco e cole na opção 'Pix Copia e Cola'.");
  };

  if (selectedGift) {
    return (
      <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-500">
        <div className="max-w-md w-full text-center">
          <button 
            onClick={() => setSelectedGift(null)}
            className="mb-8 text-gray-400 font-bold hover:text-gray-600 flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            ← Voltar para a lista
          </button>

          <h2 className="text-2xl font-black text-gray-800 mb-2">Presentear com</h2>
          <p className="text-xl font-bold text-green-600 mb-8">{selectedGift.name} ({selectedGift.price})</p>

          <div className="bg-gray-50 p-8 rounded-[3rem] border-2 border-dashed border-gray-200 mb-8">
            <img 
              src={selectedGift.qrCodeUrl} 
              alt="QR Code PIX" 
              className="w-64 h-64 mx-auto mb-6 rounded-2xl shadow-sm border-4 border-white"
            />
            
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Pix Copia e Cola</p>
            
            {/* BOTÃO DE COPIAR AUTOMÁTICO */}
            <button
              onClick={() => handleCopyPix(selectedGift.pixKey)}
              className="w-full bg-white p-4 rounded-xl border border-gray-100 break-all font-mono font-bold text-green-700 text-sm hover:bg-green-50 transition-colors shadow-sm flex flex-col items-center gap-2"
            >
              <span className="text-[10px] text-gray-400 uppercase tracking-tighter">Clique para copiar o código</span>
              {selectedGift.pixKey.substring(0, 30)}...
            </button>
          </div>

          <p className="text-gray-500 text-sm font-medium px-4 leading-relaxed">
            Se estiver no computador, <span className="font-bold text-gray-700">escaneie o código</span> com o app do banco. <br/>
            Se estiver no celular, <span className="font-bold text-gray-700">copie o código acima</span> e use a função "Pix Copia e Cola" no seu banco.
          </p>
        </div>
      </div>
    );
  }

 // Visão da Lista Geral
  return (
    <div className="min-h-screen w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto"> 
        <header className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">Escolha um Presente</h1>
          <p className="text-gray-500 font-medium">Clique no presente que deseja escolher para ver os dados do PIX.</p>
        </header>

        {/* Ajuste de Grid: 1 coluna no celular, 2 em tablets, 3 em computadores padrão */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {gifts.map((gift) => (
            <button 
              key={gift.id} 
              onClick={() => setSelectedGift(gift)}
              className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col hover:scale-[1.03] transition-all duration-300 text-left group h-full"
            >
              {/* CONTAINER DO GIF: Aumentado para dar destaque total no PC */}
              <div className="w-full aspect-[4/3] overflow-hidden bg-gray-200 flex items-center justify-center">
                <img 
                  src={gift.imageUrl} 
                  alt={gift.name} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  onError={(e) => {
                    // Caso o GIF falhe, ele tentará recarregar ou mostrará uma cor de fundo
                    e.currentTarget.src = "https://placehold.co/600x400?text=Carregando+GIF...";
                  }}
                />
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-green-600 transition-colors uppercase tracking-tight">
                  {gift.name}
                </h3>
                <p className="text-green-600 font-bold text-3xl mb-6">
                  {gift.price}
                </p>
                
                {/* Botão de rodapé do card sempre alinhado embaixo */}
                <div className="mt-auto bg-gray-100 text-gray-400 text-[10px] font-black py-4 px-4 rounded-2xl uppercase text-center group-hover:bg-green-50 group-hover:text-green-600 transition-colors">
                  Clique para presentear
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};