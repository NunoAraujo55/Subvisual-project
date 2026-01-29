pragma solidity ^0.8.0;

   import "forge-std/Test.sol";
   import "../src/MessageBoard.sol";

   contract MessageBoardTest is Test {
       MessageBoard messageboard;

       function setUp() public {
           messageboard = new MessageBoard();
       }

       function testSetAndGet() public {
            messageboard.postMessage("helloooo");
            MessageBoard.Message memory m = messageboard.getMessage(0);

            assertEq(keccak256(bytes(m.text)),keccak256(bytes("helloooo")), "Stored messsage is incorrect");
            assertEq(m.author, address(this), "Author is not the same");
            assertEq(messageboard.getMessagesCount(), 1, "Erro a gerar mensagens");
       }

        function testCannotPostEmptyMessage() public {
            vm.expectRevert();
            messageboard.postMessage("");
        }
   }