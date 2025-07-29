// ===== AUDIO MANAGER WITH SOUND EFFECTS AND MUSIC =====
export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.sounds = new Map();
        this.musicTracks = new Map();
        this.currentMusic = null;
        this.masterVolume = 0.7;
        this.sfxVolume = 0.5;
        this.musicVolume = 0.3;
        this.isMuted = false;
        this.isEnabled = true;
        
        // Audio libraries and presets
        this.oscillators = new Map();
        this.analyser = null;
        this.frequencyData = null;
        
        this.init();
    }

    async init() {
        // Check if audio is supported
        if (!this.checkAudioSupport()) {
            console.warn('🔇 Audio not supported in this browser');
            this.isEnabled = false;
            return;
        }

        try {
            // Initialize Web Audio API
            await this.initializeAudioContext();
            
            // Create sound effects
            this.createSoundEffects();
            
            // Setup visualizer
            this.setupAudioAnalyzer();
            
            // Load background music
            await this.loadBackgroundMusic();
            
            console.log('🎵 Audio Manager initialized');
        } catch (error) {
            console.warn('🔇 Failed to initialize audio:', error);
            this.isEnabled = false;
        }
    }

    checkAudioSupport() {
        return !!(window.AudioContext || window.webkitAudioContext);
    }

    async initializeAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioContext = new AudioContext();
        
        // Resume context on user interaction (required by browsers)
        const resumeContext = async () => {
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
                document.removeEventListener('click', resumeContext);
                document.removeEventListener('touchstart', resumeContext);
                document.removeEventListener('keydown', resumeContext);
            }
        };
        
        document.addEventListener('click', resumeContext);
        document.addEventListener('touchstart', resumeContext);
        document.addEventListener('keydown', resumeContext);
    }

    setupAudioAnalyzer() {
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.fftSize = 256;
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    }

    createSoundEffects() {
        // Button hover sound
        this.createOscillatorSound('buttonHover', {
            type: 'sine',
            frequency: 800,
            duration: 0.1,
            volume: 0.3,
            envelope: { attack: 0.01, decay: 0.09 }
        });

        // Button click sound
        this.createOscillatorSound('buttonClick', {
            type: 'square',
            frequency: 1200,
            duration: 0.15,
            volume: 0.4,
            envelope: { attack: 0.01, decay: 0.14 }
        });

        // Success notification
        this.createOscillatorSound('success', {
            type: 'sine',
            frequencies: [523, 659, 784], // C5, E5, G5 chord
            duration: 0.5,
            volume: 0.6,
            envelope: { attack: 0.1, decay: 0.4 }
        });

        // Error notification
        this.createOscillatorSound('error', {
            type: 'sawtooth',
            frequency: 200,
            duration: 0.3,
            volume: 0.5,
            envelope: { attack: 0.05, decay: 0.25 }
        });

        // Page transition
        this.createOscillatorSound('transition', {
            type: 'sine',
            frequency: 440,
            duration: 0.8,
            volume: 0.3,
            envelope: { attack: 0.2, decay: 0.6 },
            effects: ['reverb']
        });

        // Particle burst
        this.createNoiseSound('particleBurst', {
            duration: 0.2,
            volume: 0.2,
            filter: { type: 'highpass', frequency: 2000 }
        });

        // Typing sound
        this.createOscillatorSound('typing', {
            type: 'square',
            frequency: 1500,
            duration: 0.05,
            volume: 0.1,
            envelope: { attack: 0.01, decay: 0.04 }
        });

        // Skill animation sound
        this.createOscillatorSound('skillProgress', {
            type: 'sine',
            frequency: 600,
            duration: 0.3,
            volume: 0.3,
            envelope: { attack: 0.1, decay: 0.2 }
        });

        // Portfolio filter sound
        this.createOscillatorSound('portfolioFilter', {
            type: 'triangle',
            frequency: 880,
            duration: 0.4,
            volume: 0.4,
            envelope: { attack: 0.05, decay: 0.35 }
        });

        // Loading completion
        this.createOscillatorSound('loadComplete', {
            type: 'sine',
            frequencies: [440, 554, 659, 880], // A4, C#5, E5, A5
            duration: 1.0,
            volume: 0.5,
            envelope: { attack: 0.2, decay: 0.8 }
        });
    }

    createOscillatorSound(name, config) {
        this.sounds.set(name, {
            type: 'oscillator',
            config: {
                type: config.type || 'sine',
                frequency: config.frequency || 440,
                frequencies: config.frequencies || null,
                duration: config.duration || 0.2,
                volume: config.volume || 0.5,
                envelope: config.envelope || { attack: 0.01, decay: 0.19 },
                effects: config.effects || []
            }
        });
    }

    createNoiseSound(name, config) {
        this.sounds.set(name, {
            type: 'noise',
            config: {
                duration: config.duration || 0.2,
                volume: config.volume || 0.5,
                filter: config.filter || null
            }
        });
    }

    async loadBackgroundMusic() {
        // In a real application, you would load actual audio files
        // For this demo, we'll create ambient background tones
        this.createAmbientMusic('ambient1', {
            frequencies: [55, 82.4, 110, 164.8], // A1, E2, A2, E3
            duration: 30,
            volume: 0.1
        });

        this.createAmbientMusic('ambient2', {
            frequencies: [65.4, 98, 130.8, 196], // C2, G2, C3, G3
            duration: 45,
            volume: 0.1
        });
    }

    createAmbientMusic(name, config) {
        this.musicTracks.set(name, {
            type: 'ambient',
            config: {
                frequencies: config.frequencies,
                duration: config.duration,
                volume: config.volume || 0.2,
                fadeIn: config.fadeIn || 2,
                fadeOut: config.fadeOut || 2
            }
        });
    }

    // Play sound effects
    playSound(soundName, options = {}) {
        if (!this.isEnabled || this.isMuted || !this.sounds.has(soundName)) {
            return;
        }

        const sound = this.sounds.get(soundName);
        const volume = (options.volume || 1) * this.sfxVolume * this.masterVolume;

        try {
            if (sound.type === 'oscillator') {
                this.playOscillatorSound(sound.config, volume);
            } else if (sound.type === 'noise') {
                this.playNoiseSound(sound.config, volume);
            }
        } catch (error) {
            console.warn('Failed to play sound:', soundName, error);
        }
    }

    playOscillatorSound(config, volume) {
        const now = this.audioContext.currentTime;
        const gainNode = this.audioContext.createGain();
        
        // Connect to audio analyzer
        gainNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        if (config.frequencies && Array.isArray(config.frequencies)) {
            // Play chord
            config.frequencies.forEach((freq, index) => {
                const osc = this.audioContext.createOscillator();
                osc.type = config.type;
                osc.frequency.setValueAtTime(freq, now);
                
                const oscGain = this.audioContext.createGain();
                oscGain.gain.setValueAtTime(0, now);
                oscGain.gain.linearRampToValueAtTime(volume / config.frequencies.length, now + config.envelope.attack);
                oscGain.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
                
                osc.connect(oscGain);
                oscGain.connect(gainNode);
                
                osc.start(now);
                osc.stop(now + config.duration);
            });
        } else {
            // Single oscillator
            const osc = this.audioContext.createOscillator();
            osc.type = config.type;
            osc.frequency.setValueAtTime(config.frequency, now);
            
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(volume, now + config.envelope.attack);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + config.duration);
            
            osc.connect(gainNode);
            osc.start(now);
            osc.stop(now + config.duration);
        }
    }

    playNoiseSound(config, volume) {
        const bufferSize = this.audioContext.sampleRate * config.duration;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);

        // Generate white noise
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;

        const gainNode = this.audioContext.createGain();
        gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);

        let filterNode = null;
        if (config.filter) {
            filterNode = this.audioContext.createBiquadFilter();
            filterNode.type = config.filter.type;
            filterNode.frequency.setValueAtTime(config.filter.frequency, this.audioContext.currentTime);
            
            source.connect(filterNode);
            filterNode.connect(gainNode);
        } else {
            source.connect(gainNode);
        }

        gainNode.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        source.start();
    }

    // Background music control
    async playMusic(trackName, loop = true) {
        if (!this.isEnabled || this.isMuted || !this.musicTracks.has(trackName)) {
            return;
        }

        this.stopMusic();

        const track = this.musicTracks.get(trackName);
        if (track.type === 'ambient') {
            this.playAmbientMusic(track.config, loop);
        }

        this.currentMusic = trackName;
    }

    playAmbientMusic(config, loop) {
        const now = this.audioContext.currentTime;
        const masterGain = this.audioContext.createGain();
        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(config.volume * this.musicVolume * this.masterVolume, now + config.fadeIn);

        const oscillators = config.frequencies.map(freq => {
            const osc = this.audioContext.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            const gain = this.audioContext.createGain();
            gain.gain.setValueAtTime(1 / config.frequencies.length, now);

            osc.connect(gain);
            gain.connect(masterGain);

            return { osc, gain };
        });

        masterGain.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);

        oscillators.forEach(({ osc }) => {
            osc.start(now);
            if (!loop) {
                osc.stop(now + config.duration);
            }
        });

        // Store for cleanup
        this.currentMusicNodes = { masterGain, oscillators };

        if (loop) {
            // Restart after duration
            setTimeout(() => {
                if (this.currentMusic) {
                    this.playMusic(this.currentMusic, true);
                }
            }, config.duration * 1000);
        }
    }

    stopMusic() {
        if (this.currentMusicNodes) {
            const { masterGain, oscillators } = this.currentMusicNodes;
            const now = this.audioContext.currentTime;

            // Fade out
            masterGain.gain.linearRampToValueAtTime(0, now + 1);

            setTimeout(() => {
                oscillators.forEach(({ osc }) => {
                    try {
                        osc.stop();
                    } catch (e) {
                        // Oscillator already stopped
                    }
                });
            }, 1000);

            this.currentMusicNodes = null;
        }
        this.currentMusic = null;
    }

    // Audio visualization
    getFrequencyData() {
        if (this.analyser && this.frequencyData) {
            this.analyser.getByteFrequencyData(this.frequencyData);
            return this.frequencyData;
        }
        return null;
    }

    getAudioLevel() {
        const data = this.getFrequencyData();
        if (!data) return 0;

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
            sum += data[i];
        }
        return sum / data.length / 255;
    }

    // Volume and settings control
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
    }

    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        
        if (this.currentMusicNodes) {
            const { masterGain } = this.currentMusicNodes;
            masterGain.gain.setTargetAtTime(
                this.musicVolume * this.masterVolume,
                this.audioContext.currentTime,
                0.1
            );
        }
    }

    mute() {
        this.isMuted = true;
        this.stopMusic();
    }

    unmute() {
        this.isMuted = false;
    }

    toggleMute() {
        if (this.isMuted) {
            this.unmute();
        } else {
            this.mute();
        }
        return !this.isMuted;
    }

    // Convenience methods for common UI sounds
    playButtonHover() {
        this.playSound('buttonHover');
    }

    playButtonClick() {
        this.playSound('buttonClick');
    }

    playSuccessSound() {
        this.playSound('success');
    }

    playErrorSound() {
        this.playSound('error');
    }

    playTransitionSound() {
        this.playSound('transition');
    }

    playTypingSound() {
        this.playSound('typing', { volume: 0.5 });
    }

    playParticleBurst() {
        this.playSound('particleBurst');
    }

    playSkillProgress() {
        this.playSound('skillProgress');
    }

    playPortfolioFilter() {
        this.playSound('portfolioFilter');
    }

    playLoadComplete() {
        this.playSound('loadComplete');
    }

    // Audio reactive effects
    createAudioReactiveCallback(callback, sensitivity = 1) {
        const updateAudioData = () => {
            if (!this.isEnabled) return;

            const level = this.getAudioLevel();
            const frequencyData = this.getFrequencyData();
            
            if (callback && typeof callback === 'function') {
                callback({
                    level: level * sensitivity,
                    frequencies: frequencyData,
                    bass: frequencyData ? this.getFrequencyRange(frequencyData, 0, 5) : 0,
                    mid: frequencyData ? this.getFrequencyRange(frequencyData, 5, 15) : 0,
                    high: frequencyData ? this.getFrequencyRange(frequencyData, 15, 30) : 0
                });
            }

            requestAnimationFrame(updateAudioData);
        };

        updateAudioData();
    }

    getFrequencyRange(data, start, end) {
        let sum = 0;
        const count = Math.min(end, data.length) - start;
        
        for (let i = start; i < Math.min(end, data.length); i++) {
            sum += data[i];
        }
        
        return count > 0 ? (sum / count) / 255 : 0;
    }

    // Settings panel integration
    getSettings() {
        return {
            enabled: this.isEnabled,
            muted: this.isMuted,
            masterVolume: this.masterVolume,
            sfxVolume: this.sfxVolume,
            musicVolume: this.musicVolume,
            currentMusic: this.currentMusic,
            availableMusic: Array.from(this.musicTracks.keys())
        };
    }

    updateSettings(settings) {
        if (settings.hasOwnProperty('enabled')) {
            this.isEnabled = settings.enabled;
        }
        if (settings.hasOwnProperty('muted')) {
            this.isMuted = settings.muted;
        }
        if (settings.hasOwnProperty('masterVolume')) {
            this.setMasterVolume(settings.masterVolume);
        }
        if (settings.hasOwnProperty('sfxVolume')) {
            this.setSfxVolume(settings.sfxVolume);
        }
        if (settings.hasOwnProperty('musicVolume')) {
            this.setMusicVolume(settings.musicVolume);
        }
        if (settings.hasOwnProperty('currentMusic') && settings.currentMusic) {
            this.playMusic(settings.currentMusic, true);
        }
    }

    // Cleanup
    destroy() {
        this.stopMusic();
        
        if (this.audioContext && this.audioContext.state !== 'closed') {
            this.audioContext.close();
        }
        
        this.sounds.clear();
        this.musicTracks.clear();
        this.oscillators.clear();
        
        this.audioContext = null;
        this.analyser = null;
        this.frequencyData = null;
        this.currentMusicNodes = null;
    }
}

// Audio visualizer for integration with particle systems
export class AudioVisualizer {
    constructor(audioManager, canvas) {
        this.audioManager = audioManager;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isActive = false;
        this.mode = 'bars'; // 'bars', 'circular', 'wave'
        
        this.init();
    }

    init() {
        this.audioManager.createAudioReactiveCallback((audioData) => {
            if (this.isActive) {
                this.visualize(audioData);
            }
        });
    }

    visualize(audioData) {
        if (!audioData.frequencies) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.mode) {
            case 'bars':
                this.drawBars(audioData.frequencies);
                break;
            case 'circular':
                this.drawCircular(audioData.frequencies);
                break;
            case 'wave':
                this.drawWave(audioData.frequencies);
                break;
        }
    }

    drawBars(frequencies) {
        const barWidth = this.canvas.width / frequencies.length;
        const centerY = this.canvas.height / 2;

        for (let i = 0; i < frequencies.length; i++) {
            const barHeight = (frequencies[i] / 255) * centerY;
            const x = i * barWidth;

            // Create gradient
            const gradient = this.ctx.createLinearGradient(0, centerY - barHeight, 0, centerY + barHeight);
            gradient.addColorStop(0, `hsla(${i * 2}, 70%, 60%, 0.8)`);
            gradient.addColorStop(1, `hsla(${i * 2}, 70%, 40%, 0.4)`);

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x, centerY - barHeight, barWidth - 1, barHeight * 2);
        }
    }

    drawCircular(frequencies) {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.3;

        for (let i = 0; i < frequencies.length; i++) {
            const angle = (i / frequencies.length) * Math.PI * 2;
            const amplitude = (frequencies[i] / 255) * radius;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + amplitude);
            const y2 = centerY + Math.sin(angle) * (radius + amplitude);

            this.ctx.strokeStyle = `hsla(${i * 3}, 70%, 60%, 0.7)`;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        }
    }

    drawWave(frequencies) {
        const centerY = this.canvas.height / 2;
        const stepX = this.canvas.width / frequencies.length;

        this.ctx.strokeStyle = 'rgba(78, 205, 196, 0.8)';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, centerY);

        for (let i = 0; i < frequencies.length; i++) {
            const x = i * stepX;
            const y = centerY + (frequencies[i] / 255 - 0.5) * centerY * 2;
            this.ctx.lineTo(x, y);
        }

        this.ctx.stroke();
    }

    setMode(mode) {
        if (['bars', 'circular', 'wave'].includes(mode)) {
            this.mode = mode;
        }
    }

    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
