document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('.post h2, .post h3');
  const toc = document.getElementById('toc');
  
  if (headings.length > 0 && toc) {
    let tocHTML = '';
    let currentLevel = 2;
    
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      const id = heading.textContent.toLowerCase().replace(/\s+/g, '-');
      heading.id = id;
      
      if (level > currentLevel) {
        tocHTML += '<ul>';
      } else if (level < currentLevel) {
        tocHTML += '</ul>';
      }
      
      tocHTML += `<li><a href="#${id}">${heading.textContent}</a></li>`;
      currentLevel = level;
    });
    
    toc.innerHTML = tocHTML;
    
    // スクロールスパイ機能
    window.addEventListener('scroll', function() {
      const fromTop = window.scrollY + 100;
      const links = toc.querySelectorAll('a');
      
      links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
          if (section.offsetTop <= fromTop && 
              section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        }
      });
    });
  }

  // --- TOC Toggle Functionality for Mobile ---
  const tocToggleButton = document.getElementById('toc-toggle-button');
  const tocCloseButton = document.getElementById('toc-close-button');
  const tocContainer = document.querySelector('.toc-container');
  let tocOverlay = document.querySelector('.toc-overlay'); // Try to select existing overlay

  // If overlay doesn't exist in HTML, create it dynamically
  if (!tocOverlay) {
    tocOverlay = document.createElement('div');
    tocOverlay.classList.add('toc-overlay');
    document.body.appendChild(tocOverlay); // Append it to the body
  }


  const toggleToc = () => {
    if (tocContainer && tocOverlay) {
      const isOpen = tocContainer.classList.contains('is-open');
      tocContainer.classList.toggle('is-open', !isOpen);
      tocOverlay.classList.toggle('is-open', !isOpen);
      // Optional: Prevent body scroll when TOC is open
      // document.body.style.overflow = isOpen ? '' : 'hidden';
    }
  };

  if (tocToggleButton && tocCloseButton && tocContainer && tocOverlay) {
    tocToggleButton.addEventListener('click', toggleToc);
    tocCloseButton.addEventListener('click', toggleToc);
    tocOverlay.addEventListener('click', toggleToc); // Close TOC when overlay is clicked
  } else {
    // Log error if elements are not found, helps debugging
    if (!tocToggleButton) console.error('TOC Toggle Button not found');
    if (!tocCloseButton) console.error('TOC Close Button not found');
    if (!tocContainer) console.error('TOC Container not found');
    // No error for overlay as it's created dynamically if needed
  }
  // --- End TOC Toggle Functionality ---

});