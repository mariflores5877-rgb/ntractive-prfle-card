// Profile Card Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const editBtn = document.getElementById('edit-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const editModal = document.getElementById('edit-modal');
  const editForm = document.getElementById('edit-form');
  const cancelEdit = document.getElementById('cancel-edit');
  const nameElement = document.getElementById('name');
  const titleElement = document.getElementById('title');
  const bioElement = document.getElementById('bio');
  const skillsList = document.getElementById('skills-list');
  const contactLinks = document.querySelectorAll('.contact-link');

  // Initialize theme from localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark-theme', currentTheme === 'dark');

  // Event Listeners
  editBtn.addEventListener('click', openEditModal);
  themeToggle.addEventListener('click', toggleTheme);
  cancelEdit.addEventListener('click', closeEditModal);
  editForm.addEventListener('submit', saveProfile);

  // Contact link interactions
  contactLinks.forEach(link => {
    link.addEventListener('click', handleContactClick);
  });

  // Close modal when clicking outside
  editModal.addEventListener('click', function(e) {
    if (e.target === editModal) {
      closeEditModal();
    }
  });

  // Functions
  function openEditModal() {
    // Populate form with current values
    document.getElementById('edit-name').value = nameElement.textContent;
    document.getElementById('edit-title').value = titleElement.textContent;
    document.getElementById('edit-bio').value = bioElement.textContent;
    document.getElementById('edit-skills').value = Array.from(skillsList.children)
      .map(li => li.textContent)
      .join(', ');

    editModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  function closeEditModal() {
    editModal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scroll
  }

  function saveProfile(e) {
    e.preventDefault();

    // Update profile information
    nameElement.textContent = document.getElementById('edit-name').value;
    titleElement.textContent = document.getElementById('edit-title').value;
    bioElement.textContent = document.getElementById('edit-bio').value;

    // Update skills
    const skillsText = document.getElementById('edit-skills').value;
    const skills = skillsText.split(',').map(skill => skill.trim()).filter(skill => skill);
    skillsList.innerHTML = skills.map(skill => `<li>${skill}</li>`).join('');

    // Save to localStorage
    const profileData = {
      name: nameElement.textContent,
      title: titleElement.textContent,
      bio: bioElement.textContent,
      skills: skills
    };
    localStorage.setItem('profileData', JSON.stringify(profileData));

    closeEditModal();

    // Show success animation
    showSuccessMessage();
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Animate theme change
    themeToggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      themeToggle.style.transform = '';
    }, 150);
  }

  function handleContactClick(e) {
    e.preventDefault();
    const type = e.target.dataset.type;

    // Simulate contact actions (in a real app, these would open actual links or modals)
    switch(type) {
      case 'email':
        alert('Opening email client...');
        break;
      case 'linkedin':
        alert('Opening LinkedIn profile...');
        break;
      case 'github':
        alert('Opening GitHub profile...');
        break;
    }

    // Add click animation
    e.target.style.transform = 'scale(0.95)';
    setTimeout(() => {
      e.target.style.transform = '';
    }, 150);
  }

  function showSuccessMessage() {
    // Create and show a temporary success message
    const message = document.createElement('div');
    message.textContent = 'Profile updated successfully!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #4CAF50;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 1001;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(message);

    setTimeout(() => {
      message.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(message);
      }, 300);
    }, 2000);
  }

  // Load saved profile data
  function loadProfileData() {
    const savedData = localStorage.getItem('profileData');
    if (savedData) {
      const profileData = JSON.parse(savedData);
      nameElement.textContent = profileData.name;
      titleElement.textContent = profileData.title;
      bioElement.textContent = profileData.bio;
      skillsList.innerHTML = profileData.skills.map(skill => `<li>${skill}</li>`).join('');
    }
  }

  // Initialize profile data
  loadProfileData();

  // Add some interactive hover effects
  const skillItems = document.querySelectorAll('.profile-card__skills li');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px)';
    });
    item.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && editModal.classList.contains('show')) {
      closeEditModal();
    }
  });
});

// Add CSS animations for success message
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);