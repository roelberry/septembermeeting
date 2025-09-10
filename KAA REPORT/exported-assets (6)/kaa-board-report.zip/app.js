// Dashboard Application JavaScript
class DashboardApp {
    constructor() {
        this.currentTab = 'summary';
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupInteractiveElements();
        this.setupProgressBarAnimations();
        this.animateMetrics();
        this.setupPrintFunction();
    }

    // Tab Navigation System
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = e.target.getAttribute('data-tab');
                
                if (targetTab && targetTab !== this.currentTab) {
                    this.switchTab(targetTab, tabButtons, tabContents);
                }
            });

            // Add keyboard support
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });

        // Handle keyboard shortcuts (1-6 keys for tabs)
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key >= '1' && key <= '6' && !e.ctrlKey && !e.altKey) {
                const tabIndex = parseInt(key) - 1;
                const tabButtons = document.querySelectorAll('.tab-btn');
                if (tabButtons[tabIndex]) {
                    tabButtons[tabIndex].click();
                }
            }
        });
    }

    switchTab(targetTab, tabButtons, tabContents) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
        });
        
        // Find and activate the target button and content
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(targetTab);
        
        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetButton.setAttribute('aria-selected', 'true');
            
            targetContent.classList.add('active');
            targetContent.setAttribute('aria-hidden', 'false');
            
            this.currentTab = targetTab;
            
            // Trigger animations for the newly active tab
            setTimeout(() => {
                this.animateTabContent(targetTab);
            }, 50);
            
            // Announce tab change
            this.announceToScreenReader(`${targetButton.textContent} tab activated`);
        }
    }

    // Setup Print Function
    setupPrintFunction() {
        const printBtn = document.querySelector('.print-btn');
        if (printBtn) {
            printBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Add print-mode class for better print styling
                document.body.classList.add('print-mode');
                
                try {
                    window.print();
                } catch (error) {
                    console.error('Print function failed:', error);
                    alert('Printing is not available in this environment');
                }
                
                // Remove print-mode class after a delay
                setTimeout(() => {
                    document.body.classList.remove('print-mode');
                }, 1000);
            });
        }
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        // Add hover effects to metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Metric card ${index + 1}`);
            
            const addHoverEffect = () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
                card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            };
            
            const removeHoverEffect = () => {
                card.style.transform = 'translateY(0) scale(1)';
            };
            
            card.addEventListener('mouseenter', addHoverEffect);
            card.addEventListener('mouseleave', removeHoverEffect);
            card.addEventListener('focus', addHoverEffect);
            card.addEventListener('blur', removeHoverEffect);
        });

        // Add click effects to action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Action item ${index + 1}: ${card.querySelector('h4').textContent}`);
            
            const clickHandler = () => {
                this.showActionDetails(card);
            };
            
            card.addEventListener('click', clickHandler);
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler();
                }
            });
        });

        // Add interactive effects to query items and page items
        const interactiveItems = document.querySelectorAll('.query-item, .page-item, .location-item');
        interactiveItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = 'var(--color-bg-2)';
                item.style.transform = 'translateX(4px)';
                item.style.transition = 'all 0.2s ease';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = '';
                item.style.transform = 'translateX(0)';
            });
        });
    }

    // Progress Bar Animations
    setupProgressBarAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill, .action-fill');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width;
                    
                    // Reset and animate
                    progressBar.style.width = '0%';
                    progressBar.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth;
                    }, 150);
                }
            });
        }, observerOptions);

        progressBars.forEach(bar => observer.observe(bar));
    }

    // Animate Tab Content
    animateTabContent(tabId) {
        const tabContent = document.getElementById(tabId);
        if (!tabContent) return;
        
        const animatableElements = tabContent.querySelectorAll(
            '.metric-card, .chart-container, .action-card, .opportunity-category, ' +
            '.seo-queries, .page-performance, .engagement-metrics, .top-actions, .user-flow'
        );
        
        // Reset and animate elements
        animatableElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 80 + 100);
        });
    }

    // Animate Metrics Counter
    animateMetrics() {
        const metricValues = document.querySelectorAll('.metric-value, .metric-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const element = entry.target;
                    element.setAttribute('data-animated', 'true');
                    
                    const text = element.textContent.trim();
                    const numbers = text.match(/[\d.]+/g);
                    
                    if (numbers && numbers.length > 0) {
                        const mainNumber = parseFloat(numbers[0]);
                        if (mainNumber > 0) {
                            this.animateCounter(element, 0, mainNumber, text);
                        }
                    }
                }
            });
        }, { threshold: 0.5 });

        metricValues.forEach(metric => observer.observe(metric));
    }

    animateCounter(element, start, end, originalText) {
        const duration = 1800;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Smooth easing function
            const easedProgress = 1 - Math.pow(1 - progress, 2);
            const currentValue = start + (end - start) * easedProgress;
            
            // Update display based on original text format
            let displayValue;
            if (originalText.includes('%')) {
                displayValue = Math.floor(currentValue) + '%';
            } else if (originalText.includes('m') && originalText.includes('s')) {
                const totalSeconds = Math.floor(currentValue * 60 + 26); // 5m 26s = 326 seconds
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                displayValue = `${minutes}m ${seconds}s`;
            } else if (originalText.includes('.')) {
                displayValue = (currentValue).toFixed(1);
            } else {
                displayValue = Math.floor(currentValue).toLocaleString();
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = originalText; // Restore exact original
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Show Action Details Modal
    showActionDetails(actionCard) {
        const title = actionCard.querySelector('h4').textContent;
        const description = actionCard.querySelector('.action-description').textContent;
        const owner = actionCard.querySelector('.action-owner').textContent;
        const timeline = actionCard.querySelector('.action-timeline').textContent;
        const impact = actionCard.querySelector('.impact-badge').textContent;
        
        // Remove any existing modals
        const existingModal = document.querySelector('.action-details-overlay');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        // Create modal
        const overlay = document.createElement('div');
        overlay.className = 'action-details-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'modal-title');
        
        overlay.innerHTML = `
            <div class="action-details-modal">
                <div class="modal-header">
                    <h3 id="modal-title">${title}</h3>
                    <button class="close-btn" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-detail">
                        <strong>Impact Level:</strong> 
                        <span class="impact-indicator ${impact.toLowerCase()}">${impact}</span>
                    </div>
                    <div class="modal-detail">
                        <strong>Description:</strong> ${description}
                    </div>
                    <div class="modal-detail"><strong>${owner}</strong></div>
                    <div class="modal-detail"><strong>${timeline}</strong></div>
                    <div class="modal-actions">
                        <button class="btn btn--primary">Assign Task</button>
                        <button class="btn btn--secondary">Add to Calendar</button>
                        <button class="btn btn--outline">View Details</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        this.addModalStyles();
        
        document.body.appendChild(overlay);
        
        // Focus management
        const closeBtn = overlay.querySelector('.close-btn');
        const focusableElements = overlay.querySelectorAll('button');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];
        
        // Focus the close button initially
        setTimeout(() => closeBtn.focus(), 100);
        
        // Trap focus within modal
        const trapFocus = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        e.preventDefault();
                        lastFocusable.focus();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        e.preventDefault();
                        firstFocusable.focus();
                    }
                }
            }
        };
        
        overlay.addEventListener('keydown', trapFocus);
        
        // Close modal handlers
        const closeModal = () => {
            overlay.removeEventListener('keydown', trapFocus);
            document.body.removeChild(overlay);
            // Return focus to the action card
            actionCard.focus();
        };
        
        closeBtn.addEventListener('click', closeModal);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    addModalStyles() {
        if (document.querySelector('#modal-styles')) return;
        
        const modalStyles = `
            .action-details-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease-out;
            }
            
            .action-details-modal {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
                animation: slideUp 0.3s ease-out;
                border: 1px solid var(--color-border);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
            }
            
            .modal-header h3 {
                margin: 0;
                flex: 1;
                padding-right: var(--space-16);
            }
            
            .modal-body {
                padding: var(--space-24);
            }
            
            .modal-detail {
                margin-bottom: var(--space-16);
                line-height: 1.6;
            }
            
            .impact-indicator {
                padding: var(--space-4) var(--space-8);
                border-radius: var(--radius-full);
                font-size: var(--font-size-xs);
                font-weight: var(--font-weight-bold);
                text-transform: uppercase;
            }
            
            .impact-indicator.high {
                background-color: rgba(var(--color-success-rgb), 0.2);
                color: var(--color-success);
            }
            
            .impact-indicator.medium {
                background-color: rgba(var(--color-warning-rgb), 0.2);
                color: var(--color-warning);
            }
            
            .modal-actions {
                display: flex;
                gap: var(--space-12);
                margin-top: var(--space-24);
                flex-wrap: wrap;
            }
            
            .close-btn {
                background: none;
                border: none;
                font-size: var(--font-size-2xl);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: var(--space-4);
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast) var(--ease-standard);
            }
            
            .close-btn:hover, .close-btn:focus {
                background-color: var(--color-secondary);
                color: var(--color-text);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // Accessibility Functions
    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
    }

    setupAccessibility() {
        // Add main content landmark
        const mainContent = document.querySelector('.dashboard-container');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'sr-only skip-link';
        skipLink.addEventListener('focus', () => {
            skipLink.style.position = 'absolute';
            skipLink.style.top = '10px';
            skipLink.style.left = '10px';
            skipLink.style.zIndex = '10000';
            skipLink.style.background = 'var(--color-primary)';
            skipLink.style.color = 'var(--color-btn-primary-text)';
            skipLink.style.padding = '8px 16px';
            skipLink.style.textDecoration = 'none';
            skipLink.style.borderRadius = '4px';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.position = 'absolute';
            skipLink.style.left = '-10000px';
        });
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Set up tab navigation ARIA
        const tabList = document.querySelector('.tab-navigation');
        if (tabList) {
            tabList.setAttribute('role', 'tablist');
            
            const tabButtons = tabList.querySelectorAll('.tab-btn');
            tabButtons.forEach((button, index) => {
                button.setAttribute('role', 'tab');
                button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
                button.setAttribute('aria-controls', button.getAttribute('data-tab'));
                button.id = `tab-${index}`;
            });
        }
        
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach((content, index) => {
            content.setAttribute('role', 'tabpanel');
            content.setAttribute('aria-labelledby', `tab-${index}`);
            content.setAttribute('aria-hidden', content.classList.contains('active') ? 'false' : 'true');
        });
    }
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new DashboardApp();
    dashboard.setupAccessibility();
    
    // Add smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    console.log('Kokomo Art Association Dashboard initialized successfully');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DashboardApp;
}