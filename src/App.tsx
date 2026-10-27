/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { FESTIVAL_ORDERS } from './data/orders';
import { FestivalOrder } from './types/game';
import { TitleScreen } from './components/TitleScreen';
import { MerveCharacter } from './components/MerveCharacter';
import { YufkaWorkbench } from './components/YufkaWorkbench';
import { FestivalCourtyard } from './components/FestivalCourtyard';
import { MathNotebookModal } from './components/MathNotebookModal';
import { VictoryModal } from './components/VictoryModal';
import { sound } from './utils/sound';
import { Volume2, VolumeX, BookOpen, RotateCcw, Home, Sparkles } from 'lucide-react';

export default function App() {
  // Game screens: 'title' | 'playing'
  const [gameState, setGameState] = useState<'title' | 'playing'>('title');

  // Game mode: 'story' | 'endless'
  const [gameMode, setGameMode] = useState<'story' | 'endless'>('story');

  // Story progression
  const [currentOrderIndex, setCurrentOrderIndex] = useState<number>(0);
  const [completedOrderIds, setCompletedOrderIds] = useState<number[]>([]);

  // Endless custom order
  const [endlessOrder, setEndlessOrder] = useState<FestivalOrder | null>(null);

  // Merve Hanım's active dialogue
  const [dialogue, setDialogue] = useState<string>('');
  const [merveMood, setMerveMood] = useState<'happy' | 'thinking' | 'celebrating'>('happy');

  // Modals & UI States
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isDelivering, setIsDelivering] = useState<boolean>(false);

  // Active order object
  const activeOrder: FestivalOrder =
    gameMode === 'endless' && endlessOrder
      ? endlessOrder
      : FESTIVAL_ORDERS[currentOrderIndex] || FESTIVAL_ORDERS[0];

  // Set initial dialogue when active order changes
  useEffect(() => {
    if (activeOrder) {
      setDialogue(activeOrder.dialogueIntro);
      setMerveMood('happy');
    }
  }, [currentOrderIndex, gameMode, endlessOrder, activeOrder]);

  // Start story mode game from Title Screen
  const handleStartGame = () => {
    setGameState('playing');
    setGameMode('story');
    setCurrentOrderIndex(0);
    setCompletedOrderIds([]);
    setIsVictoryOpen(false);
  };

  // Toggle Mute
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  // Keyboard shortcut for sound mute (M key)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        handleToggleMute();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Generate a random order for endless mode
  const generateRandomOrder = useCallback((): FestivalOrder => {
    const possibleRadii = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const r = possibleRadii[Math.floor(Math.random() * possibleRadii.length)];
    const area = 3 * r * r;
    const tableNames = [
      'Güneşli Bahçe Masası',
      'Akasya Altı Masası',
      'Çınar Altı Ziyafeti',
      'Davullu Halay Masası',
      'Köy Çeşmesi Yanı',
    ];
    const dishes = [
      'Çıtır Çıtır Ispanaklı Börek',
      'Sıcak Tereyağlı Gözleme',
      'Cevizli Katmer',
      'Kıymalı Tepsi Böreği',
    ];
    const tableName = tableNames[Math.floor(Math.random() * tableNames.length)];
    const dishName = dishes[Math.floor(Math.random() * dishes.length)];

    return {
      id: Math.floor(Math.random() * 10000) + 100,
      tableName,
      dishName,
      targetArea: area,
      targetRadius: r,
      dialogueIntro: `“Yeni bir sipariş geldi! Bu masaya tam ${area} cm² alanında bir yufka gerekiyor. Hadi hemen tezgâha koyulalım!”`,
      dialogueSuccess: `“Harika bir ustalık! ${area} cm² yufkamız tam vaktinde masaya ulaştı.”`,
      hintText: `${area} = 3 · r² eşitliğinden r² = ${area / 3} ve r = ${r} cm bulunur.`,
      tableIcon: '🍽️',
      tableColor: 'bg-amber-600',
    };
  }, []);

  // Start Endless Freeplay Mode
  const handleStartEndless = () => {
    setGameMode('endless');
    setIsVictoryOpen(false);
    setGameState('playing');
    setEndlessOrder(generateRandomOrder());
  };

  // Order Delivery Evaluation
  const handleDeliverOrder = (currentRadius: number, currentArea: number) => {
    if (isDelivering) return;

    if (currentRadius === activeOrder.targetRadius) {
      // SUCCESS: MATCHES TARGET
      sound.playCorrect();
      sound.playDeliver();
      setIsDelivering(true);
      setMerveMood('celebrating');
      setDialogue(activeOrder.dialogueSuccess);

      // Trigger Confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f59e0b', '#10b981', '#ffffff'],
      });

      // Update state after smooth transfer animation
      setTimeout(() => {
        setIsDelivering(false);

        if (gameMode === 'story') {
          const updatedCompleted = Array.from(new Set([...completedOrderIds, activeOrder.id]));
          setCompletedOrderIds(updatedCompleted);

          if (currentOrderIndex + 1 < FESTIVAL_ORDERS.length) {
            // Next story level
            setCurrentOrderIndex((prev) => prev + 1);
          } else {
            // ALL 8 FESTIVAL ORDERS COMPLETE!
            setIsVictoryOpen(true);
          }
        } else {
          // Endless mode: produce next order
          setEndlessOrder(generateRandomOrder());
        }
      }, 1400);
    } else {
      // INCORRECT: NATURAL PEDAGOGICAL FEEDBACK
      sound.playWrong();
      setMerveMood('thinking');
      if (currentArea < activeOrder.targetArea) {
        setDialogue(
          `“Bu yufka biraz küçük kaldı canım (r = ${currentRadius} cm, A = ${currentArea} cm²). Şenlik masamız ${activeOrder.targetArea} cm² istiyor. Biraz daha açalım!”`
        );
      } else {
        setDialogue(
          `“Bu yufka masaya sığmaz, biraz fazla büyük oldu (A = ${currentArea} cm²). Masamız ${activeOrder.targetArea} cm² istiyor. Biraz küçültelim!”`
        );
      }
    }
  };

  // If on Title Screen, render full viewport Title Screen
  if (gameState === 'title') {
    return (
      <>
        <TitleScreen
          onStartGame={handleStartGame}
          onOpenNotebook={() => setIsNotebookOpen(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
        <MathNotebookModal
          isOpen={isNotebookOpen}
          onClose={() => setIsNotebookOpen(false)}
        />
      </>
    );
  }

  // PLAYING SCREEN
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col justify-between selection:bg-amber-400 selection:text-amber-950">
      {/* TOP STATUS NAV / HEADER BAR */}
      <header className="sticky top-0 z-30 bg-amber-950/90 border-b border-amber-800/80 px-4 py-2.5 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Table Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGameState('title')}
              className="p-1.5 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-300 hover:text-white transition-colors cursor-pointer border border-amber-700/50"
              title="Açılış Ekranına Dön"
            >
              <Home className="w-4 h-4" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-fredoka text-amber-200 font-bold text-base md:text-lg">
                  Merve Hanım'ın Yufka Şenliği
                </span>
                <span className="text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">
                  {gameMode === 'story'
                    ? `Sipariş ${currentOrderIndex + 1} / ${FESTIVAL_ORDERS.length}`
                    : 'Serbest Atölye'}
                </span>
              </div>
              <p className="text-[11px] text-amber-400/80 hidden sm:block">
                {activeOrder.tableName} · {activeOrder.dishName}
              </p>
            </div>
          </div>

          {/* Action buttons: Formula notebook & Audio toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNotebookOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-700 text-amber-100 font-fredoka font-semibold text-xs border border-amber-600 shadow-xs transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Hesap Defteri</span>
              <span className="sm:hidden">İpucu</span>
            </button>

            <button
              onClick={handleToggleMute}
              className="p-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-300 hover:text-white transition-colors cursor-pointer border border-amber-700/50"
              title={isMuted ? 'Sesi Aç' : 'Sesi Kapat (M)'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN PLAY AREA */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-5">
        {/* MERVE HANIM'S SPEECH & INTRO */}
        <MerveCharacter dialogue={dialogue} mood={merveMood} />

        {/* WORKBENCH: THE HEART OF THE GAME */}
        <YufkaWorkbench
          targetArea={activeOrder.targetArea}
          targetRadius={activeOrder.targetRadius}
          onDeliverOrder={handleDeliverOrder}
          isDelivering={isDelivering}
        />

        {/* FESTIVAL COURTYARD PANORAMA (Masalar ve Şenlik Alanı) */}
        {gameMode === 'story' && (
          <FestivalCourtyard
            orders={FESTIVAL_ORDERS}
            completedOrderIds={completedOrderIds}
            currentOrderIndex={currentOrderIndex}
            onSelectOrder={(idx) => {
              setCurrentOrderIndex(idx);
            }}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-3 text-stone-500 text-xs font-mono border-t border-stone-800 bg-stone-950">
        Merve Hanım'ın Yufka Şenliği · 7. Sınıf Matematik Dersi (Dairenin Alanı: A = π · r², π = 3)
      </footer>

      {/* MODALS */}
      <MathNotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
      />

      <VictoryModal
        isOpen={isVictoryOpen}
        onRestart={handleStartGame}
        onStartEndless={handleStartEndless}
      />
    </div>
  );
}
