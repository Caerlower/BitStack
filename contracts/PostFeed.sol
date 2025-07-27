// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PostFeed
 * @dev A decentralized microblogging contract for BitStack
 * Allows users to create short public posts stored onchain
 */
contract PostFeed {
    struct Post {
        address author;
        string message;
        uint256 timestamp;
        uint256 tipAmount;
        uint256 tipCount;
    }

    // Mapping from post ID to Post struct
    mapping(uint256 => Post) public posts;
    
    // Mapping from user address to their post IDs
    mapping(address => uint256[]) public userPosts;
    
    // Total number of posts
    uint256 public totalPosts;
    
    // Events
    event PostCreated(
        address indexed author,
        uint256 indexed postId,
        string message,
        uint256 timestamp
    );
    
    event PostTipped(
        uint256 indexed postId,
        address indexed tipper,
        address indexed author,
        uint256 amount
    );

    /**
     * @dev Create a new post
     * @param message The content of the post (max 280 characters)
     */
    function createPost(string memory message) public {
        require(bytes(message).length > 0, "Message cannot be empty");
        require(bytes(message).length <= 280, "Message too long (max 280 chars)");
        
        uint256 postId = totalPosts;
        
        posts[postId] = Post({
            author: msg.sender,
            message: message,
            timestamp: block.timestamp,
            tipAmount: 0,
            tipCount: 0
        });
        
        userPosts[msg.sender].push(postId);
        totalPosts++;
        
        emit PostCreated(msg.sender, postId, message, block.timestamp);
    }

    /**
     * @dev Tip a post with BTC (mock)
     * @param postId The ID of the post to tip
     */
    function tipPost(uint256 postId) public payable {
        require(postId < totalPosts, "Post does not exist");
        require(msg.value > 0, "Tip amount must be greater than 0");
        require(msg.sender != posts[postId].author, "Cannot tip your own post");
        
        Post storage post = posts[postId];
        post.tipAmount += msg.value;
        post.tipCount++;
        
        // Transfer the tip to the post author
        payable(post.author).transfer(msg.value);
        
        emit PostTipped(postId, msg.sender, post.author, msg.value);
    }

    /**
     * @dev Get a specific post by ID
     * @param postId The ID of the post
     * @return author The address of the post author
     * @return message The content of the post
     * @return timestamp When the post was created
     * @return tipAmount Total tips received
     * @return tipCount Number of tips received
     */
    function getPost(uint256 postId) public view returns (
        address author,
        string memory message,
        uint256 timestamp,
        uint256 tipAmount,
        uint256 tipCount
    ) {
        require(postId < totalPosts, "Post does not exist");
        Post memory post = posts[postId];
        return (post.author, post.message, post.timestamp, post.tipAmount, post.tipCount);
    }

    /**
     * @dev Get all posts by a specific user
     * @param user The address of the user
     * @return Array of post IDs by the user
     */
    function getUserPosts(address user) public view returns (uint256[] memory) {
        return userPosts[user];
    }

    /**
     * @dev Get recent posts (last 50)
     * @return Array of post IDs in reverse chronological order
     */
    function getRecentPosts() public view returns (uint256[] memory) {
        uint256 count = totalPosts > 50 ? 50 : totalPosts;
        uint256[] memory recentPosts = new uint256[](count);
        
        for (uint256 i = 0; i < count; i++) {
            recentPosts[i] = totalPosts - 1 - i;
        }
        
        return recentPosts;
    }
} 