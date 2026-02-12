// Valentine's Proposal - Frontend Application
// Connects to real-time server and stores all data in database

const API_BASE = '';

// State
let currentStep = 1;
let proposalData = {
  userName: '',
  partnerName: '',
  relationshipType: 'crush',
  proposalStyle: 'romantic',
  loveMessage: ''
};

// Socket.IO for real-time updates
const socket = io();

socket.on('connect', () => {
  showToast('✓ Connected to server - your data will be saved!');
});

socket.on('newProposal', (data) => {
  showToast(`Someone just proposed to ${data.partnerName}! 💕`);
});

// DOM Elements
const steps = document.querySelectorAll('.step');
const stepIndicators = document.querySelectorAll('.step-indicator');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initStepNavigation();
  initFormHandlers();
  initProposalStyles();
});

// Step Navigation
function initStepNavigation() {
  // Next button clicks
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next);
      if (validateStep(currentStep)) {
        goToStep(nextStep);
      }
    });
  });

  // Radio cards - select on click
  document.querySelectorAll('.radio-card').forEach(card => {
    card.addEventListener('click', () => {
      const type = card.dataset.type;
      document.querySelector(`input[name="relationship"][value="${type}"]`).checked = true;
      proposalData.relationshipType = type;
    });
  });

  // Style cards
  document.querySelectorAll('.style-card').forEach(card => {
    card.addEventListener('click', () => {
      const style = card.dataset.style;
      document.querySelector(`input[name="proposalStyle"][value="${style}"]`).checked = true;
      proposalData.proposalStyle = style;
    });
  });

  // New proposal button
  document.getElementById('new-proposal-btn')?.addEventListener('click', () => {
    resetProposal();
    goToStep(1);
  });

  // Share button
  document.getElementById('share-btn')?.addEventListener('click', shareProposal);
}

function initFormHandlers() {
  document.getElementById('userName')?.addEventListener('input', (e) => {
    proposalData.userName = e.target.value.trim();
  });

  document.getElementById('partnerName')?.addEventListener('input', (e) => {
    proposalData.partnerName = e.target.value.trim();
  });

  document.getElementById('loveMessage')?.addEventListener('input', (e) => {
    proposalData.loveMessage = e.target.value.trim();
  });

  document.querySelectorAll('input[name="relationship"]').forEach(input => {
    input.addEventListener('change', (e) => {
      proposalData.relationshipType = e.target.value;
    });
  });

  document.querySelectorAll('input[name="proposalStyle"]').forEach(input => {
    input.addEventListener('change', (e) => {
      proposalData.proposalStyle = e.target.value;
    });
  });
}

function initProposalStyles() {
  // Set default checked states
  document.querySelector('input[name="relationship"][value="crush"]').checked = true;
  document.querySelector('input[name="proposalStyle"][value="romantic"]').checked = true;
}

// Validation
function validateStep(step) {
  switch (step) {
    case 2:
      proposalData.userName = document.getElementById('userName').value.trim();
      if (!proposalData.userName) {
        showToast('Please enter your name');
        return false;
      }
      return true;
    case 3:
      proposalData.partnerName = document.getElementById('partnerName').value.trim();
      if (!proposalData.partnerName) {
        showToast('Please enter their name - this will be saved in our database!');
        return false;
      }
      proposalData.relationshipType = document.querySelector('input[name="relationship"]:checked').value;
      return true;
    case 4:
      proposalData.proposalStyle = document.querySelector('input[name="proposalStyle"]:checked').value;
      return true;
    case 5:
      proposalData.loveMessage = document.getElementById('loveMessage').value.trim();
      return true;
    default:
      return true;
  }
}

// Navigation
function goToStep(step) {
  // Save data when leaving step 5 (before showing proposal)
  if (step === 6) {
    saveProposalToDatabase();
  }

  steps.forEach(s => s.classList.remove('active'));
  stepIndicators.forEach(s => s.classList.remove('active', 'completed'));

  document.getElementById(`step-${step}`).classList.add('active');

  stepIndicators.forEach((indicator, index) => {
    const indicatorStep = index + 1;
    if (indicatorStep < step) {
      indicator.classList.add('completed');
    } else if (indicatorStep === step) {
      indicator.classList.add('active');
    }
  });

  currentStep = step;

  if (step === 6) {
    displayProposal();
  }
}

// Save to database
async function saveProposalToDatabase() {
  try {
    const response = await fetch(`${API_BASE}/api/proposals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userName: proposalData.userName,
        partnerName: proposalData.partnerName,
        relationshipType: proposalData.relationshipType,
        proposalStyle: proposalData.proposalStyle,
        loveMessage: proposalData.loveMessage
      })
    });

    const result = await response.json();
    if (result.success) {
      document.getElementById('success-badge').style.display = 'inline-block';
    } else {
      document.getElementById('success-badge').innerHTML = '<span>⚠ Could not save (offline mode)</span>';
      document.getElementById('success-badge').style.display = 'inline-block';
    }
  } catch (error) {
    console.error('Error saving proposal:', error);
    document.getElementById('success-badge').innerHTML = '<span>⚠ Server not connected - start the server to save!</span>';
    document.getElementById('success-badge').style.display = 'inline-block';
  }
}

// Display proposal
function displayProposal() {
  const relationshipLabels = {
    crush: 'My Crush',
    boyfriend: 'My Boyfriend',
    girlfriend: 'My Girlfriend'
  };

  const styleMessages = {
    romantic: `Every moment with you feels like a dream. ${proposalData.partnerName}, will you make me the happiest person and be mine forever?`,
    playful: `I've been trying to play it cool, but I can't hide it anymore! ${proposalData.partnerName}, will you be my Valentine? Pretty please? 😍`,
    classic: `${proposalData.partnerName}, you've captured my heart. Would you do me the honor of being mine this Valentine's Day and forever?`,
    poetic: `Like roses bloom in February's embrace, my heart blossoms for you, ${proposalData.partnerName}. Will you be my Valentine?`
  };

  const greeting = `Dear ${proposalData.partnerName} 💕`;
  const message = proposalData.loveMessage || styleMessages[proposalData.proposalStyle];
  const signature = `With all my love,\n${proposalData.userName} 💝`;

  document.getElementById('proposal-greeting').textContent = greeting;
  document.getElementById('proposal-message').textContent = message;
  document.getElementById('proposal-signature').innerHTML = signature.replace(/\n/g, '<br>');
}

// Share
function shareProposal() {
  const text = `💕 ${proposalData.userName} proposed to ${proposalData.partnerName} this Valentine's Day! Check out our proposal at ${window.location.href}`;
  if (navigator.share) {
    navigator.share({
      title: 'Valentine\'s Proposal',
      text: text
    }).then(() => showToast('Shared successfully!')).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => showToast('Share link: ' + window.location.href));
}

// Reset
function resetProposal() {
  proposalData = {
    userName: proposalData.userName,
    partnerName: '',
    relationshipType: 'crush',
    proposalStyle: 'romantic',
    loveMessage: ''
  };
  document.getElementById('partnerName').value = '';
  document.getElementById('loveMessage').value = '';
  document.querySelector('input[name="relationship"][value="crush"]').checked = true;
  document.querySelector('input[name="proposalStyle"][value="romantic"]').checked = true;
}

// Toast notification
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
