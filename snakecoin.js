// https://medium.com/crypto-currently/lets-make-the-tiniest-blockchain-bigger-ac360a328f4d
const shajs = require('sha.js');

class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.hashBlock();
  }

  hashBlock() {
    const contentStr = this.index + this.timestamp + this.data + this.previousHash;
    return shajs('sha256').update(contentStr).digest('hex');
  }
}

function createGenesisBlock() {
  return new Block(0, Date.now(), 'genesis block', 0);
}

function nextBlock(lastBlock) {
  const index = lastBlock.index + 1;
  const timestamp = Date.now();
  const data = `Hey! I'm block ${index}`;
  const hash = lastBlock.hash;
  return new Block(index, timestamp, data, hash);
}

const genesisBlock = createGenesisBlock();
const blockchain = [genesisBlock];

function addBlock() {
  const previousBlock = blockchain[blockchain.length-1];
  const newBlock = nextBlock(previousBlock);
  blockchain.push(newBlock);
  return blockchain;
}

console.log(addBlock());

console.log(addBlock());