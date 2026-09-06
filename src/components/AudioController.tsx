import React, { useEffect, useRef } from "react";
import { useApp } from "../context/AppContext";

export const AudioController: React.FC = () => {
  const { musicOn, musicVolume } = useApp();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPlayingRef = useRef<boolean>(false);

  // Soothing pentatonic notes in Hz (C major / A minor pentatonic: C4, D4, E4, G4, A4, C5)
  const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];

  const playNote = (ctx: AudioContext, gain: GainNode, freq: number) => {
    try {
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      noteGain.gain.setValueAtTime(0, ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 1.2);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8);

      osc.connect(noteGain);
      noteGain.connect(gain);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 4.0);
    } catch {
      // Audio context might be suspended
    }
  };

  const startAmbient = () => {
    if (isPlayingRef.current) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtxRef.current = new AudioCtx();
        const gain = audioCtxRef.current.createGain();
        gain.gain.setValueAtTime(musicVolume, audioCtxRef.current.currentTime);
        gain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = gain;
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      let noteIndex = 0;
      
      const tick = () => {
        if (!audioCtxRef.current || !gainNodeRef.current || !isPlayingRef.current) return;
        const freq = notes[noteIndex % notes.length];
        playNote(audioCtxRef.current, gainNodeRef.current, freq);
        // Play an octave lower harmony sometimes
        if (noteIndex % 2 === 0) {
          playNote(audioCtxRef.current, gainNodeRef.current, freq / 2);
        }
        noteIndex = (noteIndex + 1) % notes.length;
      };

      tick();
      intervalRef.current = window.setInterval(tick, 2200);
    } catch (e) {
      console.warn("Ambient audio error:", e);
    }
  };

  const stopAmbient = () => {
    isPlayingRef.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(musicVolume, audioCtxRef.current.currentTime);
    }
  }, [musicVolume]);

  useEffect(() => {
    if (musicOn) {
      // AudioContext often requires user interaction first
      const onUserInteraction = () => {
        if (musicOn) startAmbient();
        window.removeEventListener("click", onUserInteraction);
        window.removeEventListener("touchstart", onUserInteraction);
      };

      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        startAmbient();
      } else {
        window.addEventListener("click", onUserInteraction, { once: true });
        window.addEventListener("touchstart", onUserInteraction, { once: true });
      }
    } else {
      stopAmbient();
    }

    return () => {
      stopAmbient();
    };
  }, [musicOn]);

  return null;
};
