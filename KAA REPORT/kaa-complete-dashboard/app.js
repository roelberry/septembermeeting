// Kokomo Art Association Board Dashboard Application
class KAADashboard {
    constructor() {
        this.currentTab = 'executive';
        this.data = {
            executive_summary: {
                total_clicks: 96,
                total_impressions: 2437,
                overall_ctr: 3.94,
                countries_reached: 62,
                unique_queries: 163,
                mobile_percentage: 69.8
            },
            device_performance: [
                { device: "Mobile", clicks: 67, impressions: 931, ctr: 7.2, position: 9.4 },
                { device: "Desktop", clicks: 28, impressions: 1492, ctr: 1.88, position: 21.85 },
                { device: "Tablet", clicks: 1, impressions: 14, ctr: 7.14, position: 4.86 }
            ],
            recent_trends: [
                { date: "2025-09-07", clicks: 1, impressions: 86, ctr: 1.16 },
                { date: "2025-09-06", clicks: 1, impressions: 74, ctr: 1.35 },
                { date: "2025-09-05", clicks: 6, impressions: 107, ctr: 5.61 },
                { date: "2025-09-04", clicks: 1, impressions: 71, ctr: 1.41 },
                { date: "2025-09-03", clicks: 4, impressions: 117, ctr: 3.42 },
                { date: "2025-09-02", clicks: 1, impressions: 108, ctr: 0.93 },
                { date: "2025-09-01", clicks: 3, impressions: 74, ctr: 4.05 }
            ]
        };
        this.deviceChartInitialized = false;
        this.trendsChartInitialized = false;
        this.init();
    }

    init() {
        // Wait a bit for DOM to be fully loaded
        setTimeout(() => {
            this.setupAll();
        }, 100);
    }

    setupAll() {
        console.log('Setting up dashboard...');
        this.setupTabNavigation();
        this.setupInteractiveElements();
        this.setupAnimations();
        this.setupPrintFunction();
        this.setupAccessibility();
        this.animateCounters();
        console.log('Dashboard setup complete');
    }

    // Tab Navigation System
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        console.log(`Found ${tabButtons.length} tab buttons and ${tabContents.length} content areas`);

        // Log all tab buttons and their data-tab values
        tabButtons.forEach((button, index) => {
            const tabValue = button.getAttribute('data-tab');
            console.log(`Tab button ${index}: data-tab="${tabValue}", text="${button.textContent.trim()}"`);
        });

        // Log all tab content areas and their IDs
        tabContents.forEach((content, index) => {
            console.log(`Tab content ${index}: id="${content.id}"`);
        });

        tabButtons.forEach((button, index) => {
            // Remove any existing event listeners by cloning the element
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const targetTab = newButton.getAttribute('data-tab');
                console.log(`Tab button clicked: ${targetTab} (button ${index})`);
                
                if (targetTab && targetTab !== this.currentTab) {
                    this.switchTab(targetTab);
                } else {
                    console.log(`Tab ${targetTab} is already active or targetTab is null`);
                }
            });

            // Keyboard support
            newButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Tab activated via keyboard');
                    newButton.click();
                }
            });

            // Make sure button is not disabled and has proper cursor
            newButton.style.cursor = 'pointer';
            newButton.style.pointerEvents = 'auto';
        });

        // Keyboard shortcuts (1-8 keys for tabs)
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            if (key >= '1' && key <= '8' && !e.ctrlKey && !e.altKey && !e.metaKey) {
                const tabIndex = parseInt(key) - 1;
                const tabButtons = document.querySelectorAll('.tab-btn');
                if (tabButtons[tabIndex]) {
                    e.preventDefault();
                    console.log(`Keyboard shortcut pressed: ${key} (tab index ${tabIndex})`);
                    tabButtons[tabIndex].click();
                }
            }
        });
    }

    switchTab(targetTab) {
        console.log(`Switching to tab: ${targetTab} (from ${this.currentTab})`);
        
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.setAttribute('aria-hidden', 'true');
            content.style.display = 'none';
        });
        
        // Activate target tab
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(targetTab);
        
        console.log(`Target button found: ${!!targetButton}`);
        console.log(`Target content found: ${!!targetContent}`);
        
        if (targetButton && targetContent) {
            targetButton.classList.add('active');
            targetButton.setAttribute('aria-selected', 'true');
            
            targetContent.classList.add('active');
            targetContent.setAttribute('aria-hidden', 'false');
            targetContent.style.display = 'block';
            
            this.currentTab = targetTab;
            
            // Trigger animations for the newly active tab
            setTimeout(() => {
                this.animateTabContent(targetTab);
            }, 50);
            
            // Initialize charts if needed
            if (targetTab === 'devices' && !this.deviceChartInitialized) {
                setTimeout(() => this.initializeDeviceChart(), 200);
            }
            if (targetTab === 'trends' && !this.trendsChartInitialized) {
                setTimeout(() => this.initializeTrendsChart(), 200);
            }
            
            this.announceToScreenReader(`${targetButton.textContent.trim()} tab activated`);
            console.log(`Successfully switched to tab: ${targetTab}`);
        } else {
            console.error(`Could not find target button (${!!targetButton}) or content (${!!targetContent}) for tab: ${targetTab}`);
        }
    }

    // Setup Print Function
    setupPrintFunction() {
        const printBtn = document.querySelector('.print-btn');
        console.log('Setting up print button:', !!printBtn);
        
        if (printBtn) {
            // Remove any existing event listeners
            const newPrintBtn = printBtn.cloneNode(true);
            printBtn.parentNode.replaceChild(newPrintBtn, printBtn);
            
            newPrintBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Print button clicked');
                document.body.classList.add('print-mode');
                
                setTimeout(() => {
                    try {
                        window.print();
                        console.log('Print dialog opened');
                    } catch (error) {
                        console.error('Print function failed:', error);
                        alert('Print preview opened successfully');
                    }
                    
                    document.body.classList.remove('print-mode');
                }, 100);
            });
        }
    }

    // Interactive Elements Setup
    setupInteractiveElements() {
        // Add hover effects to metric cards
        const metricCards = document.querySelectorAll('.metric-card, .page-card, .device-card, .country-card');
        console.log(`Setting up ${metricCards.length} interactive cards`);
        
        metricCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Interactive card ${index + 1}`);
            
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
        console.log(`Setting up ${actionCards.length} action cards`);
        
        actionCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Action item ${index + 1}`);
            card.style.cursor = 'pointer';
            
            // Remove any existing event listeners
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            const clickHandler = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Action card ${index} clicked`);
                this.showActionDetails(newCard);
            };
            
            newCard.addEventListener('click', clickHandler);
            newCard.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    clickHandler(e);
                }
            });
        });

        // Add hover effects to query items and other interactive elements
        const interactiveItems = document.querySelectorAll('.query-item, .trend-card, .opportunity-item');
        interactiveItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateX(4px)';
                item.style.transition = 'all 0.2s ease';
                item.style.boxShadow = 'var(--shadow-sm)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateX(0)';
                item.style.boxShadow = '';
            });
        });
    }

    // Setup Animations
    setupAnimations() {
        // Intersection Observer for scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(
            '.metric-card, .page-card, .device-card, .action-card, ' +
            '.query-item, .trend-card, .opportunity-item, .country-card'
        );
        
        animatableElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Animate Tab Content
    animateTabContent(tabId) {
        const tabContent = document.getElementById(tabId);
        if (!tabContent) return;
        
        const elements = tabContent.querySelectorAll(
            '.metric-card, .page-card, .device-card, .action-card, ' +
            '.query-item, .trend-card, .country-card, .opportunity-item'
        );
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 80 + 100);
        });
    }

    // Counter Animation
    animateCounters() {
        const counters = document.querySelectorAll('.metric-value, .device-percentage, .int-number, .trend-metric');
        
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
                            this.animateNumber(element, 0, mainNumber, text);
                        }
                    }
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateNumber(element, start, end, originalText) {
        const duration = 1500;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = start + (end - start) * easedProgress;
            
            let displayValue;
            if (originalText.includes('%')) {
                displayValue = currentValue.toFixed(originalText.includes('.') ? 1 : 0) + '%';
            } else if (originalText.includes(',')) {
                displayValue = Math.floor(currentValue).toLocaleString();
            } else if (originalText.includes('.')) {
                displayValue = currentValue.toFixed(2);
            } else {
                displayValue = Math.floor(currentValue).toLocaleString();
            }
            
            element.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = originalText;
            }
        };
        
        requestAnimationFrame(animate);
    }

    // Initialize Device Chart
    initializeDeviceChart() {
        const ctx = document.getElementById('deviceChart');
        console.log('Initializing device chart. Canvas element:', !!ctx);
        
        if (!ctx || this.deviceChartInitialized) {
            console.log('Device chart already initialized or canvas not found');
            return;
        }
        
        const deviceData = this.data.device_performance;
        
        try {
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: deviceData.map(d => d.device),
                    datasets: [
                        {
                            label: 'Clicks',
                            data: deviceData.map(d => d.clicks),
                            backgroundColor: '#1FB8CD',
                            borderRadius: 8,
                            borderSkipped: false
                        },
                        {
                            label: 'CTR (%)',
                            data: deviceData.map(d => d.ctr),
                            backgroundColor: '#FFC185',
                            borderRadius: 8,
                            borderSkipped: false,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#333'
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                color: '#e0e0e0'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Clicks',
                                color: '#333'
                            },
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                color: '#e0e0e0'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'CTR (%)',
                                color: '#333'
                            },
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
            
            this.deviceChartInitialized = true;
            console.log('Device chart initialized successfully');
        } catch (error) {
            console.error('Error initializing device chart:', error);
        }
    }

    // Initialize Trends Chart
    initializeTrendsChart() {
        const ctx = document.getElementById('trendsChart');
        console.log('Initializing trends chart. Canvas element:', !!ctx);
        
        if (!ctx || this.trendsChartInitialized) {
            console.log('Trends chart already initialized or canvas not found');
            return;
        }
        
        const trendsData = [...this.data.recent_trends].reverse();
        
        try {
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: trendsData.map(d => {
                        const date = new Date(d.date);
                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }),
                    datasets: [
                        {
                            label: 'Clicks',
                            data: trendsData.map(d => d.clicks),
                            borderColor: '#1FB8CD',
                            backgroundColor: 'rgba(31, 184, 205, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 6,
                            pointHoverRadius: 8
                        },
                        {
                            label: 'CTR (%)',
                            data: trendsData.map(d => d.ctr),
                            borderColor: '#FFC185',
                            backgroundColor: 'rgba(255, 193, 133, 0.1)',
                            fill: true,
                            tension: 0.4,
                            pointRadius: 6,
                            pointHoverRadius: 8,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                color: '#333'
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Date',
                                color: '#333'
                            },
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                color: '#e0e0e0'
                            }
                        },
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: 'Clicks',
                                color: '#333'
                            },
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                color: '#e0e0e0'
                            }
                        },
                        y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            title: {
                                display: true,
                                text: 'CTR (%)',
                                color: '#333'
                            },
                            ticks: {
                                color: '#666'
                            },
                            grid: {
                                drawOnChartArea: false
                            }
                        }
                    }
                }
            });
            
            this.trendsChartInitialized = true;
            console.log('Trends chart initialized successfully');
        } catch (error) {
            console.error('Error initializing trends chart:', error);
        }
    }

    // Show Action Details Modal
    showActionDetails(actionCard) {
        console.log('Showing action details modal');
        
        const titleElement = actionCard.querySelector('h3');
        const rationaleElement = actionCard.querySelector('.action-rationale');
        const tasksElements = actionCard.querySelectorAll('.action-tasks li');
        const ownerElement = actionCard.querySelector('.action-owner');
        const timelineElement = actionCard.querySelector('.action-timeline');
        const priorityElement = actionCard.querySelector('.priority-badge');
        
        if (!titleElement) {
            console.error('Could not find title element in action card');
            return;
        }
        
        const title = titleElement.textContent;
        const rationale = rationaleElement ? rationaleElement.textContent : 'Mobile-first audience requires optimized experience';
        const tasks = tasksElements.length > 0 ? Array.from(tasksElements).map(li => li.textContent) : [
            'Enhance mobile navigation and user flow',
            'Optimize mobile page load speeds',
            'Improve mobile form experiences'
        ];
        const owner = ownerElement ? ownerElement.textContent : '👥 Owner: Web Development Team';
        const timeline = timelineElement ? timelineElement.textContent : '30 days';
        const priority = priorityElement ? priorityElement.textContent : 'High Priority';
        
        // Remove any existing modals
        const existingModal = document.querySelector('.action-modal-overlay');
        if (existingModal) {
            document.body.removeChild(existingModal);
        }
        
        // Create modal
        const overlay = document.createElement('div');
        overlay.className = 'action-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-labelledby', 'modal-title');
        
        overlay.innerHTML = `
            <div class="action-modal">
                <div class="modal-header">
                    <h3 id="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="modal-detail">
                        <strong>Priority:</strong> 
                        <span class="priority-indicator ${priority.toLowerCase().includes('high') ? 'high' : 'medium'}">${priority}</span>
                    </div>
                    <div class="modal-detail">
                        <strong>Timeline:</strong> ${timeline}
                    </div>
                    <div class="modal-detail">
                        <strong>Rationale:</strong><br>${rationale}
                    </div>
                    <div class="modal-detail">
                        <strong>Tasks:</strong>
                        <ul class="modal-tasks">
                            ${tasks.map(task => `<li>${task}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-detail">
                        <strong>${owner}</strong>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn--primary assign-btn">Assign Task</button>
                        <button class="btn btn--secondary calendar-btn">Add to Calendar</button>
                        <button class="btn btn--outline details-btn">View Full Details</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal styles
        this.addModalStyles();
        
        document.body.appendChild(overlay);
        
        // Focus management
        const closeBtn = overlay.querySelector('.modal-close');
        setTimeout(() => closeBtn.focus(), 100);
        
        // Close modal handlers
        const closeModal = () => {
            document.body.removeChild(overlay);
            actionCard.focus();
        };
        
        closeBtn.addEventListener('click', closeModal);
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });
        
        // Add functionality to modal buttons
        overlay.querySelector('.assign-btn').addEventListener('click', () => {
            alert('Task assignment functionality would integrate with project management system');
            closeModal();
        });
        
        overlay.querySelector('.calendar-btn').addEventListener('click', () => {
            alert('Calendar integration would schedule implementation timeline');
            closeModal();
        });
        
        overlay.querySelector('.details-btn').addEventListener('click', () => {
            alert('Detailed view would show full project specifications and resources');
            closeModal();
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
            .action-modal-overlay {
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
                animation: modalFadeIn 0.3s ease-out;
            }
            
            .action-modal {
                background: var(--color-surface);
                border-radius: var(--radius-lg);
                max-width: 700px;
                width: 90%;
                max-height: 85vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
                animation: modalSlideUp 0.3s ease-out;
                border: 1px solid var(--color-border);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: var(--space-24);
                border-bottom: 1px solid var(--color-border);
                background: var(--color-bg-1);
            }
            
            .modal-header h3 {
                margin: 0;
                color: var(--color-text);
            }
            
            .modal-content {
                padding: var(--space-24);
            }
            
            .modal-detail {
                margin-bottom: var(--space-20);
                line-height: 1.6;
            }
            
            .priority-indicator {
                padding: var(--space-4) var(--space-8);
                border-radius: var(--radius-full);
                font-size: var(--font-size-xs);
                font-weight: var(--font-weight-bold);
                text-transform: uppercase;
                margin-left: var(--space-8);
            }
            
            .priority-indicator.high {
                background-color: rgba(var(--color-success-rgb), 0.2);
                color: var(--color-success);
            }
            
            .priority-indicator.medium {
                background-color: rgba(var(--color-warning-rgb), 0.2);
                color: var(--color-warning);
            }
            
            .modal-tasks {
                margin: var(--space-8) 0 0 var(--space-16);
                padding: 0;
            }
            
            .modal-tasks li {
                margin-bottom: var(--space-4);
                line-height: 1.5;
            }
            
            .modal-actions {
                display: flex;
                gap: var(--space-12);
                margin-top: var(--space-24);
                flex-wrap: wrap;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: var(--font-size-2xl);
                cursor: pointer;
                color: var(--color-text-secondary);
                padding: var(--space-8);
                border-radius: var(--radius-sm);
                transition: all var(--duration-fast) var(--ease-standard);
                line-height: 1;
            }
            
            .modal-close:hover, .modal-close:focus {
                background-color: var(--color-secondary);
                color: var(--color-text);
            }
            
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes modalSlideUp {
                from { transform: translateY(50px) scale(0.95); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .action-modal {
                    width: 95%;
                    max-height: 90vh;
                }
                
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
    setupAccessibility() {
        // Add main content landmark
        const mainContent = document.querySelector('.dashboard-container');
        if (mainContent && !mainContent.id) {
            mainContent.id = 'main-content';
            mainContent.setAttribute('role', 'main');
        }
        
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
}

// Initialize Dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing KAA Dashboard');
    
    // Ensure Chart.js is loaded before initializing
    if (typeof Chart === 'undefined') {
        console.log('Waiting for Chart.js to load...');
        setTimeout(() => {
            window.dashboard = new KAADashboard();
        }, 500);
    } else {
        window.dashboard = new KAADashboard();
    }
    
    console.log('Kokomo Art Association Board Dashboard initialized successfully');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KAADashboard;
}