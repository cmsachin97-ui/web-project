const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

// Initialize data file if it doesn't exist
function initData() {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = { proposals: [], partnerNames: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function readData() {
  return initData();
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function saveProposal(data) {
  const db = readData();
  
  const proposal = {
    id: db.proposals.length + 1,
    userName: data.userName,
    partnerName: data.partnerName,
    relationshipType: data.relationshipType,
    proposalStyle: data.proposalStyle,
    loveMessage: data.loveMessage || '',
    createdAt: new Date().toISOString()
  };

  db.proposals.push(proposal);
  db.partnerNames.push({
    id: db.partnerNames.length + 1,
    name: data.partnerName,
    relationshipType: data.relationshipType,
    createdAt: new Date().toISOString()
  });

  writeData(db);
  return { lastInsertRowid: proposal.id };
}

function getAllProposals() {
  const db = readData();
  return db.proposals.reverse();
}

function getAllPartnerNames() {
  const db = readData();
  const names = [];
  const seen = new Set();
  db.partnerNames.reverse().forEach(n => {
    const key = `${n.name}-${n.relationshipType}`;
    if (!seen.has(key)) {
      seen.add(key);
      names.push(n);
    }
  });
  return names;
}

function getProposalById(id) {
  const db = readData();
  return db.proposals.find(p => p.id === parseInt(id));
}

module.exports = {
  saveProposal,
  getAllProposals,
  getAllPartnerNames,
  getProposalById
};
