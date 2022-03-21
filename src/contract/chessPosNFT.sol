pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract NFT is ERC721URIStorage { 
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct ChessPosNFTSource {
        // URI used as source/key of NFT, we can consider it as tokens DNA
        string uri;

        // address of candidate creator - a.k.a. address of person who initialy provided source URI
        address creator;

        // metadata of the nft hosted on ipfs
        string metadataUri;
    }

    /**
   * @dev Mapping from NFT ID to marble NFT source.
   */
    mapping (uint256 => ChessPosNFTSource) public idToChessPosNFTSource;
    /**
   * @dev Mapping from marble NFT source uri hash TO NFT ID .
   */
    mapping (string => uint256) public sourceUriToId;

    constructor() ERC721("ChessPos-NFT", "ChessPos-NFT") {

    }

    function createToken(string memory metadataUri,string memory _uri) public returns (uint) {

        require(sourceUriToId[_uri] == 0, "NFT with same PGN/FEN already exists!");

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataUri);

        idToChessPosNFTSource[newItemId] = ChessPosNFTSource(_uri, msg.sender, metadataUri);

        sourceUriToId[_uri] = newItemId;
    
        return newItemId;
    }

    function tokenSource(uint256 _tokenId)
        public
        view
        returns (
            string memory uri,
            address creator,
            string memory metadataUri)
        {
          ChessPosNFTSource memory chessposNFTSource = idToChessPosNFTSource[_tokenId];
          return (chessposNFTSource.uri, chessposNFTSource.creator, chessposNFTSource.metadataUri);
        }

    function tokenBySourceUri(string memory _uri)
      public
      view
      returns (uint256 tokenId)
    {
      return sourceUriToId[_uri];
    }

}
