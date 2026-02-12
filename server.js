const express = require('express');
const path = require('path');
const cors = require('cors');
const {
  saveProposal,
  getAllProposals,
  getAllPartnerNames,
} = require('./database');

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Save proposal (stores user name, partner/crush name, etc.)
app.post('/api/proposals', (req, res) => {
  try {
    const {
      userName,
      partnerName,
      relationshipType,
      proposalStyle,
      loveMessage,
    } = req.body;

    if (!userName || !partnerName || !relationshipType || !proposalStyle) {
      return res.status(400).json({
        success: false,
        error:
          'Missing required fields: userName, partnerName, relationshipType, proposalStyle',
      });
    }

    const result = saveProposal({
      userName,
      partnerName,
      relationshipType,
      proposalStyle,
      loveMessage,
    });

    res.json({
      success: true,
      id: result.lastInsertRowid,
      message: 'Proposal saved successfully!',
    });
  } catch (error) {
    console.error('Error saving proposal:', error);
    res.status(500).json({ success: false, error: 'Failed to save proposal' });
  }
});

// Get all proposals
app.get('/api/proposals', (req, res) => {
  try {
    const proposals = getAllProposals();
    res.json({ success: true, data: proposals });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch proposals' });
  }
});

// Get all stored partner names
app.get('/api/names', (req, res) => {
  try {
    const names = getAllPartnerNames();
    res.json({ success: true, data: names });
  } catch (error) {
    console.error('Error fetching names:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch names' });
  }
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `\n💕 Simple Valentine's Proposal Server running at http://localhost:${PORT}\n`,
  );
});
