/**
 * Advanced Analytics System for Portfolio & Template Showcase
 * Tracks user interactions, template views, and engagement metrics
 * GDPR Compliant with user consent management
 */
class AdvancedAnalytics {
    constructor() {
        this.isGtagLoaded = false;
        this.eventQueue = [];
        this.sessionStart = Date.now();
        this.hasConsent = false;
        this.consentChecked = false;
        this.init();
    }

    init() {
        this.checkConsent();
        this.setupConsentHandlers();
    }

    checkConsent() {
        // Check if user has already given consent
        const consent = localStorage.getItem('analytics_consent');
        if (consent === 'accepted') {
            this.hasConsent = true;
            this.consentChecked = true;
            this.initializeAnalytics();
        } else if (consent === 'declined') {
            this.hasConsent = false;
            this.consentChecked = true;
            console.log('📊 Analytics: Consenso rifiutato dall\'utente');
        } else {
            // Show consent banner
            this.showConsentBanner();
        }
    }

    showConsentBanner() {
        const banner = document.getElementById('analytics-notice');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 2000); // Show after 2 seconds
        }
    }

    hideConsentBanner() {
        const banner = document.getElementById('analytics-notice');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    setupConsentHandlers() {
        document.addEventListener('DOMContentLoaded', () => {
            const acceptBtn = document.getElementById('accept-analytics');
            const declineBtn = document.getElementById('decline-analytics');

            if (acceptBtn) {
                acceptBtn.addEventListener('click', () => {
                    this.acceptConsent();
                });
            }

            if (declineBtn) {
                declineBtn.addEventListener('click', () => {
                    this.declineConsent();
                });
            }
        });
    }

    acceptConsent() {
        localStorage.setItem('analytics_consent', 'accepted');
        this.hasConsent = true;
        this.consentChecked = true;
        this.hideConsentBanner();
        
        // Update Google Analytics consent
        if (typeof window.updateAnalyticsConsent === 'function') {
            window.updateAnalyticsConsent(true);
        }
        
        this.initializeAnalytics();
        
        // Track consent acceptance
        setTimeout(() => {
            this.sendEvent('consent_granted', {
                consent_type: 'analytics',
                event_category: 'privacy'
            });
        }, 1000);
        
        console.log('✅ Analytics: Consenso accettato');
    }

    declineConsent() {
        localStorage.setItem('analytics_consent', 'declined');
        this.hasConsent = false;
        this.consentChecked = true;
        this.hideConsentBanner();
        
        // Update Google Analytics consent
        if (typeof window.updateAnalyticsConsent === 'function') {
            window.updateAnalyticsConsent(false);
        }
        
        console.log('❌ Analytics: Consenso rifiutato');
    }

    initializeAnalytics() {
        if (!this.hasConsent) return;

        this.waitForGtag(() => {
            this.isGtagLoaded = true;
            this.processEventQueue();
            this.setupAutoTracking();
            this.trackPageLoad();
        });
    }

    waitForGtag(callback) {
        if (typeof gtag !== 'undefined') {
            callback();
        } else {
            setTimeout(() => this.waitForGtag(callback), 100);
        }
    }

    processEventQueue() {
        this.eventQueue.forEach(event => {
            this.sendEvent(event.name, event.parameters);
        });
        this.eventQueue = [];
    }

    sendEvent(eventName, parameters = {}) {
        if (!this.hasConsent) {
            console.log('📊 Analytics: Evento non inviato - consenso non dato');
            return;
        }

        if (!this.isGtagLoaded) {
            this.eventQueue.push({ name: eventName, parameters });
            return;
        }

        // Enhanced parameters with session info
        const enhancedParams = {
            ...parameters,
            session_duration: Math.round((Date.now() - this.sessionStart) / 1000),
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            viewport_width: window.innerWidth,
            viewport_height: window.innerHeight
        };

        console.log(`📊 Analytics Event: ${eventName}`, enhancedParams);
        gtag('event', eventName, enhancedParams);
    }

    // Page Load Tracking
    trackPageLoad() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        this.sendEvent('page_load_complete', {
            load_time_ms: loadTime,
            page_title: document.title,
            referrer: document.referrer || 'direct'
        });
    }

    // Template Interaction Tracking
    trackTemplateView(templateId, templateName, category) {
        if (!this.hasConsent) return;
        
        this.sendEvent('template_view', {
            template_id: templateId,
            template_name: templateName,
            template_category: category,
            event_category: 'template_interaction'
        });
    }

    trackTemplateDemo(templateId, templateName, demoUrl) {
        if (!this.hasConsent) return;
        
        this.sendEvent('template_demo_click', {
            template_id: templateId,
            template_name: templateName,
            demo_url: demoUrl,
            event_category: 'template_interaction'
        });
    }

    trackTemplateFilter(filterType, filterValue) {
        if (!this.hasConsent) return;
        
        this.sendEvent('template_filter_used', {
            filter_type: filterType,
            filter_value: filterValue,
            event_category: 'template_interaction'
        });
    }

    // Project Interaction Tracking
    trackProjectView(projectId, projectName, category) {
        if (!this.hasConsent) return;
        
        this.sendEvent('project_view', {
            project_id: projectId,
            project_name: projectName,
            project_category: category,
            event_category: 'project_interaction'
        });
    }

    trackProjectGithub(projectId, projectName, githubUrl) {
        if (!this.hasConsent) return;
        
        this.sendEvent('project_github_click', {
            project_id: projectId,
            project_name: projectName,
            github_url: githubUrl,
            event_category: 'project_interaction'
        });
    }

    // Contact & Engagement Tracking
    trackContactMethod(method, destination) {
        if (!this.hasConsent) return;
        
        this.sendEvent('contact_method_used', {
            contact_method: method,
            destination: destination,
            event_category: 'engagement'
        });
    }

    trackSocialClick(platform, url) {
        if (!this.hasConsent) return;
        
        this.sendEvent('social_media_click', {
            social_platform: platform,
            social_url: url,
            event_category: 'engagement'
        });
    }

    // Navigation Tracking
    trackNavigation(section, method = 'click') {
        if (!this.hasConsent) return;
        
        this.sendEvent('navigation_used', {
            section: section,
            navigation_method: method,
            event_category: 'navigation'
        });
    }

    // Scroll Depth Tracking
    trackScrollDepth(depth) {
        if (!this.hasConsent) return;
        
        this.sendEvent('scroll_depth', {
            scroll_depth_percent: depth,
            event_category: 'engagement'
        });
    }

    // Download Tracking
    trackDownload(fileName, fileType) {
        this.sendEvent('file_download', {
            file_name: fileName,
            file_type: fileType,
            event_category: 'engagement'
        });
    }

    // Error Tracking
    trackError(errorType, errorMessage, context) {
        this.sendEvent('javascript_error', {
            error_type: errorType,
            error_message: errorMessage,
            error_context: context,
            event_category: 'error'
        });
    }

    // Performance Tracking
    trackPerformance() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            this.sendEvent('performance_metrics', {
                dns_time: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
                connect_time: Math.round(perfData.connectEnd - perfData.connectStart),
                response_time: Math.round(perfData.responseEnd - perfData.responseStart),
                dom_load_time: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
                window_load_time: Math.round(perfData.loadEventEnd - perfData.navigationStart),
                event_category: 'performance'
            });
        }
    }

    // Automatic Tracking Setup
    setupAutoTracking() {
        // Scroll depth tracking
        this.setupScrollTracking();
        
        // Link tracking
        this.setupLinkTracking();
        
        // Error tracking
        this.setupErrorTracking();
        
        // Performance tracking
        setTimeout(() => this.trackPerformance(), 3000);
    }

    setupScrollTracking() {
        let maxScroll = 0;
        const thresholds = [25, 50, 75, 90, 100];
        const tracked = new Set();

        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            thresholds.forEach(threshold => {
                if (maxScroll >= threshold && !tracked.has(threshold)) {
                    tracked.add(threshold);
                    this.trackScrollDepth(threshold);
                }
            });
        });
    }

    setupLinkTracking() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;

            const href = link.getAttribute('href');
            const isExternal = href && (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel'));
            
            if (isExternal) {
                const linkType = href.startsWith('mailto') ? 'email' : 
                               href.startsWith('tel') ? 'phone' : 'external';
                
                this.sendEvent('external_link_click', {
                    link_url: href,
                    link_text: link.textContent.trim(),
                    link_type: linkType,
                    event_category: 'engagement'
                });
            }
        });
    }

    setupErrorTracking() {
        window.addEventListener('error', (e) => {
            this.trackError('javascript_error', e.message, {
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.trackError('promise_rejection', e.reason, {
                type: 'unhandled_promise_rejection'
            });
        });
    }
}

// Initialize Analytics
window.portfolioAnalytics = new AdvancedAnalytics();

// Export for external use
window.trackTemplateView = (id, name, category) => window.portfolioAnalytics.trackTemplateView(id, name, category);
window.trackTemplateDemo = (id, name, url) => window.portfolioAnalytics.trackTemplateDemo(id, name, url);
window.trackProjectView = (id, name, category) => window.portfolioAnalytics.trackProjectView(id, name, category);
window.trackContactMethod = (method, destination) => window.portfolioAnalytics.trackContactMethod(method, destination);
