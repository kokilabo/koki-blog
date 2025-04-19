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
});