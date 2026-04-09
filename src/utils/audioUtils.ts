class AudioEngine {
    private ac: AudioContext | null = null;
    private initialized = false;

    init() {
        if (!this.initialized && typeof window !== 'undefined') {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            this.ac = new AudioContext();
            this.initialized = true;
        }
    }

    private playTone(freq: number, type: OscillatorType, duration: number, vol = 0.1) {
        if (!this.ac) return;
        const osc = this.ac.createOscillator();
        const gain = this.ac.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ac.currentTime);
        
        gain.gain.setValueAtTime(vol, this.ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ac.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(this.ac.destination);
        
        osc.start();
        osc.stop(this.ac.currentTime + duration);
    }

    playClick() {
        this.init();
        this.playTone(800, 'sine', 0.05, 0.05);
    }

    playSpinTick() {
        this.init();
        this.playTone(1200, 'triangle', 0.03, 0.02);
    }

    playWin() {
        this.init();
        if (!this.ac) return;
        // Simple arpeggio
        const notes = [440, 554, 659, 880];
        notes.forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'sine', 0.3, 0.1), i * 100);
        });
    }

    playFlip() {
        this.init();
        this.playTone(300, 'square', 0.1, 0.05);
        setTimeout(() => this.playTone(400, 'square', 0.1, 0.05), 100);
    }
}

export const soundEffects = new AudioEngine();
