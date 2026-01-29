pragma solidity ^0.8.20;

contract MessageBoard {
    struct Message {
        address author;
        string text;
        uint256 timestamp;
    }

    Message[] public messages;

    function postMessage(string memory text) public {
        require(bytes(text).length > 0 && bytes(text).length <= 280, "mensagem invalida");
        messages.push(Message(msg.sender, text, block.timestamp));
    }

    function getMessage(uint256 index) public view returns (Message memory) {
        return messages[index];
    }

    function getMessagesCount() public view returns (uint256) {
        return messages.length;
    }
}
