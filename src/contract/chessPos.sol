//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';


contract ChessPos is ReentrancyGuard {

    uint256 mintingPriceGame =  2.0 ether;
    uint256 mintingPricePosition = 0.5 ether;

    enum Results{ WON, LOST }

    enum Player{ CREATOR, CHALLENGER, WAITING }

    struct ChessGame{
        string gameId;
        address payable creator;
        address payable challenger;
        string gamePGN;
        Player winner;
        bool finished;
        uint256 stakedToken;
    }

    struct ChessGamesPlayed{
        string gameId;
        address payable owner;
        address payable opponent;
        string gamePGN;
        Results result;
        uint256 stakedToken;
        Player player;
    }

    mapping(string => ChessGame) public idToChessGame;

    mapping(address => mapping(string => ChessGamesPlayed)) public playerToChessGames;

    event GameCreated(
        string gameId,
        address payable creator,
        address payable challenger,
        string gamePGN,
        Player winner,
        bool finished,
        uint256 stakedToken
    );

    event GameJoined(
        string gameId,
        address payable creator,
        address payable challenger,
        string gamePGN,
        Player winner,
        bool finished,
        uint256 stakedToken
    );

    event GameOver(
        string gameId,
        address payable creator,
        address payable challenger,
        string gamePGN,
        Player winner,
        bool finished,
        uint256 stakedToken
    );

    function createGame(string memory gameId) public payable nonReentrant {
            require(msg.value > 0,'Must have something at stake.');
        
            idToChessGame[gameId] = ChessGame(gameId, payable(msg.sender), payable(address(0)), "", Player.WAITING, false, msg.value);

            emit GameCreated(gameId, payable(msg.sender), payable(address(0)), "", Player.WAITING, false, msg.value);
    }

    function joinGame(string memory gameId) public payable nonReentrant {
            require(msg.value == idToChessGame[gameId].stakedToken,'Must have same amount of staked tokens');
            require(idToChessGame[gameId].challenger == payable(address(0)),'game already started');
            require(idToChessGame[gameId].winner == Player.WAITING,'game finished');
            require(idToChessGame[gameId].finished == false ,'game already finshed');

            idToChessGame[gameId].challenger = payable(msg.sender);
            
            emit GameJoined(gameId, idToChessGame[gameId].creator, idToChessGame[gameId].challenger, idToChessGame[gameId].gamePGN, idToChessGame[gameId].winner, idToChessGame[gameId].finished, idToChessGame[gameId].stakedToken);
    }

    function unstake(string memory gameId) public nonReentrant {
            require(idToChessGame[gameId].challenger == payable(address(0)),'game already started');
            require(idToChessGame[gameId].winner == Player.WAITING,'game finished');
            require(idToChessGame[gameId].finished == false ,'game already finshed');
            require(idToChessGame[gameId].creator == msg.sender ,'Only creator can unstake');

            idToChessGame[gameId].creator.transfer(idToChessGame[gameId].stakedToken);
            delete idToChessGame[gameId];
    }

    function reportWinner(string memory gameId,string memory pgn) public nonReentrant {
            require(idToChessGame[gameId].challenger == msg.sender || idToChessGame[gameId].creator == msg.sender, 'must be called either by creator or by challenger');
            require(idToChessGame[gameId].winner == Player.WAITING,'game finished');
            require(idToChessGame[gameId].finished == false ,'game already finshed');
            
            idToChessGame[gameId].finished = true;
            idToChessGame[gameId].gamePGN = pgn;
            
            if(idToChessGame[gameId].creator == msg.sender){
                idToChessGame[gameId].winner = Player.CREATOR;
                idToChessGame[gameId].creator.transfer(2 * idToChessGame[gameId].stakedToken);
                playerToChessGames[msg.sender][gameId] = ChessGamesPlayed(gameId, payable(msg.sender), payable(idToChessGame[gameId].challenger), pgn, Results.WON, idToChessGame[gameId].stakedToken, Player.CREATOR);
                playerToChessGames[idToChessGame[gameId].challenger][gameId] = ChessGamesPlayed(gameId, payable(idToChessGame[gameId].challenger), payable(msg.sender), pgn, Results.LOST, idToChessGame[gameId].stakedToken, Player.CHALLENGER);
            }else{
                idToChessGame[gameId].winner = Player.CHALLENGER;
                idToChessGame[gameId].challenger.transfer(2 * idToChessGame[gameId].stakedToken);
                playerToChessGames[msg.sender][gameId] = ChessGamesPlayed(gameId, payable(msg.sender), payable(idToChessGame[gameId].creator), pgn, Results.WON, idToChessGame[gameId].stakedToken, Player.CHALLENGER);
                playerToChessGames[idToChessGame[gameId].creator][gameId] = ChessGamesPlayed(gameId, payable(idToChessGame[gameId].creator), payable(msg.sender), pgn, Results.LOST, idToChessGame[gameId].stakedToken, Player.CREATOR);
            }

            emit GameOver(gameId, idToChessGame[gameId].creator, idToChessGame[gameId].challenger, idToChessGame[gameId].gamePGN, idToChessGame[gameId].winner, idToChessGame[gameId].finished, idToChessGame[gameId].stakedToken);
    }

}

