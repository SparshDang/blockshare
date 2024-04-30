// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Share {
    struct File {
        string name;
        string IpfsHash;
    }

    struct Friend {
        string name;
        address address_;
    }

    mapping(address => mapping(address => File[])) sharedData;
    mapping(address => Friend[]) friends;
    mapping(address => address[]) notifications;

    function shareFile(
        address user,
        string memory name,
        string memory hash
    ) external {
        sharedData[msg.sender][user].push(File({name: name, IpfsHash: hash}));
        addNewNotification(user);
    }

    function getFiles(address user) external view returns (File[] memory) {
        return sharedData[user][msg.sender];
    }

    function sharedFiles(address user) external view returns (File[] memory) {
        return sharedData[msg.sender][user];
    }

    function deleteFile(address user, string memory fileHash) external {
        File[] storage sharedFilesWithUser = sharedData[msg.sender][user];
        uint256 index = 0;
        for (uint256 i = 0; i < sharedFilesWithUser.length; i++) {
            if (
                bytes(fileHash).length ==
                bytes(sharedFilesWithUser[i].IpfsHash).length &&
                keccak256(abi.encodePacked(fileHash)) ==
                keccak256(abi.encodePacked(sharedFilesWithUser[i].IpfsHash))
            ) {
                index = i;
                break;
            }
        }
        sharedFilesWithUser[index] = sharedFilesWithUser[
            sharedFilesWithUser.length - 1
        ];
        sharedFilesWithUser.pop();
        sharedData[msg.sender][user] = sharedFilesWithUser;
    }

    function addFriend(address user, string memory name) external {
        for (uint256 i = 0; i < friends[msg.sender].length; i++) {
            require(friends[msg.sender][i].address_ != user, "Already Friend");
        }
        friends[msg.sender].push(Friend({name: name, address_: user}));
    }

    function getFriends() external view returns (Friend[] memory) {
        return friends[msg.sender];
    }

    function deleteFriend(address user) external {
        uint256 index = 0;
        for (uint256 i = 0; i < friends[msg.sender].length; i++) {
            if (user == friends[msg.sender][i].address_) {
                index = i;
                break;
            }
        }
        friends[msg.sender][index] = friends[msg.sender][
            friends[msg.sender].length - 1
        ];
        friends[msg.sender].pop();
    }

    function addNewNotification(address user) internal  {
        if (!alreadyInNotification(user)) {
            notifications[user].push(msg.sender);
        }
    }

    function alreadyInNotification(address user) internal view returns (bool) {
        for (uint256 i = 0; i < notifications[user].length; i++) {
            if (notifications[user][i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function removeNotification() public {
        delete notifications[msg.sender];
    }

    function getNotifications() public view returns (address[] memory){
        return notifications[msg.sender];
    }
}
