document.addEventListener('DOMContentLoaded', function() {
    initImpactStoriesSlider();
});

/**
 * Initialize the impact stories slider
 */
function initImpactStoriesSlider() {
    // Sample stories data
    const stories = [
        {
            image: 'images/story-1.jpg',
            title: 'Rural Chess Initiative',
            content: 'Our rural chess initiative has brought chess to over 50 villages in Haryana, providing equipment, training, and regular competitions. This has led to the discovery of several talented young players who are now competing at the state level.',
            quote: 'Chess has transformed our village. Children who once had limited recreational activities now engage in this intellectual sport, showing improved concentration and academic performance.',
            author: 'Ramesh Singh, Village Sarpanch, Bhiwani District'
        },
        {
            image: 'images/story-2.jpg',
            title: 'Girls in Chess Program',
            content: 'Our "Girls in Chess" program has encouraged over 500 girls from across Haryana to take up chess. Through dedicated coaching and all-girls tournaments, we have created a supportive environment for female players to thrive.',
            quote: 'Chess has given me confidence and taught me strategic thinking. I never thought I could compete at state level, but the special training programs for girls made it possible.',
            author: 'Priya Sharma, State Girls Champion, Karnal'
        },
        {
            image: 'images/story-3.jpg',
            title: 'School Chess Integration',
            content: 'Our school chess integration program has successfully implemented chess as part of the curriculum in 150 schools across Haryana. Teachers report improved concentration, problem-solving skills, and academic performance among participating students.',
            quote: 'Introducing chess in our school curriculum has shown remarkable results. Students who regularly play chess demonstrate better analytical thinking and patience in their studies.',
            author: 'Dr. Anand Kumar, Principal, Model School, Panchkula'
        }
    ];
    
    let currentStoryIndex = 0;
    const storyContainer = document.querySelector('.story-card');
    const prevButton = document.querySelector('.story-nav-btn.prev');
    const nextButton = document.querySelector('.story-nav-btn.next');
    const indicators = document.querySelectorAll('.story-indicators .indicator');
    
    // Check if elements exist
    if (!storyContainer || !prevButton || !nextButton || indicators.length === 0) return;
    
    // Function to update the story display
    function updateStory(index) {
        const story = stories[index];
        
        // Update story content
        storyContainer.innerHTML = `
            <div class="story-image">
                <img src="${story.image}" alt="${story.title}">
            </div>
            <div class="story-content">
                <h3>${story.title}</h3>
                <p>${story.content}</p>
                <div class="story-quote">
                    <p>"${story.quote}"</p>
                    <cite>- ${story.author}</cite>
                </div>
            </div>
        `;
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
        
        // Update current index
        currentStoryIndex = index;
    }
    
    // Add click event for previous button
    prevButton.addEventListener('click', function() {
        let newIndex = currentStoryIndex - 1;
        if (newIndex < 0) newIndex = stories.length - 1;
        updateStory(newIndex);
    });
    
    // Add click event for next button
    nextButton.addEventListener('click', function() {
        let newIndex = currentStoryIndex + 1;
        if (newIndex >= stories.length) newIndex = 0;
        updateStory(newIndex);
    });
    
    // Add click events for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateStory(index);
        });
    });
    
    // Auto-rotate stories every 8 seconds
    let autoRotate = setInterval(function() {
        let newIndex = currentStoryIndex + 1;
        if (newIndex >= stories.length) newIndex = 0;
        updateStory(newIndex);
    }, 8000);
    
    // Pause auto-rotation when hovering over the story
    storyContainer.addEventListener('mouseenter', function() {
        clearInterval(autoRotate);
    });
    
    // Resume auto-rotation when mouse leaves the story
    storyContainer.addEventListener('mouseleave', function() {
        autoRotate = setInterval(function() {
            let newIndex = currentStoryIndex + 1;
            if (newIndex >= stories.length) newIndex = 0;
            updateStory(newIndex);
        }, 8000);
    });
}