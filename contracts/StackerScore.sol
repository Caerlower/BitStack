// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title StackerScore
 * @dev Tracks stack-based actions and calculates social reputation scores
 * Score = (tips sent + tips received) with additional multipliers
 */
contract StackerScore {
    struct UserScore {
        uint256 tipsSent;
        uint256 tipsReceived;
        uint256 totalScore;
        uint256 lastActivity;
        uint256 streakDays;
    }

    // Mapping from user address to their score data
    mapping(address => UserScore) public userScores;
    
    // Events
    event ScoreUpdated(
        address indexed user,
        uint256 newScore,
        uint256 tipsSent,
        uint256 tipsReceived
    );
    
    event StreakUpdated(
        address indexed user,
        uint256 newStreak
    );

    /**
     * @dev Update user score when they send a tip
     * @param tipper The address of the person sending the tip
     * @param recipient The address receiving the tip
     * @param amount The amount of the tip
     */
    function updateScoreOnTip(address tipper, address recipient, uint256 amount) external {
        // Only callable by the PostFeed contract
        require(msg.sender == address(0x0), "Only authorized contracts can update scores");
        
        UserScore storage tipperScore = userScores[tipper];
        UserScore storage recipientScore = userScores[recipient];
        
        // Update tipper's sent tips
        tipperScore.tipsSent += amount;
        tipperScore.lastActivity = block.timestamp;
        
        // Update recipient's received tips
        recipientScore.tipsReceived += amount;
        recipientScore.lastActivity = block.timestamp;
        
        // Calculate new scores
        uint256 tipperNewScore = calculateScore(tipperScore.tipsSent, tipperScore.tipsReceived);
        uint256 recipientNewScore = calculateScore(recipientScore.tipsSent, recipientScore.tipsReceived);
        
        tipperScore.totalScore = tipperNewScore;
        recipientScore.totalScore = recipientNewScore;
        
        // Update streaks
        updateStreak(tipper);
        updateStreak(recipient);
        
        emit ScoreUpdated(tipper, tipperNewScore, tipperScore.tipsSent, tipperScore.tipsReceived);
        emit ScoreUpdated(recipient, recipientNewScore, recipientScore.tipsSent, recipientScore.tipsReceived);
    }

    /**
     * @dev Calculate score based on tips sent and received
     * @param tipsSent Total tips sent by user
     * @param tipsReceived Total tips received by user
     * @return The calculated score
     */
    function calculateScore(uint256 tipsSent, uint256 tipsReceived) public pure returns (uint256) {
        // Base score: tips sent + tips received
        uint256 baseScore = tipsSent + tipsReceived;
        
        // Bonus for being generous (sending more than receiving)
        uint256 generosityBonus = 0;
        if (tipsSent > tipsReceived) {
            generosityBonus = (tipsSent - tipsReceived) / 10; // 10% bonus for generosity
        }
        
        return baseScore + generosityBonus;
    }

    /**
     * @dev Update user's activity streak
     * @param user The user address
     */
    function updateStreak(address user) internal {
        UserScore storage score = userScores[user];
        
        // Check if user was active within the last 24 hours
        if (block.timestamp - score.lastActivity <= 1 days) {
            score.streakDays++;
        } else {
            score.streakDays = 1; // Reset streak
        }
        
        emit StreakUpdated(user, score.streakDays);
    }

    /**
     * @dev Get user's complete score data
     * @param user The user address
     * @return tipsSent Total tips sent
     * @return tipsReceived Total tips received
     * @return totalScore Calculated total score
     * @return lastActivity Last activity timestamp
     * @return streakDays Current streak in days
     */
    function getUserScore(address user) public view returns (
        uint256 tipsSent,
        uint256 tipsReceived,
        uint256 totalScore,
        uint256 lastActivity,
        uint256 streakDays
    ) {
        UserScore memory score = userScores[user];
        return (score.tipsSent, score.tipsReceived, score.totalScore, score.lastActivity, score.streakDays);
    }

    /**
     * @dev Get user's current score
     * @param user The user address
     * @return The current total score
     */
    function getScore(address user) public view returns (uint256) {
        return userScores[user].totalScore;
    }

    /**
     * @dev Get user's streak
     * @param user The user address
     * @return Current streak in days
     */
    function getStreak(address user) public view returns (uint256) {
        return userScores[user].streakDays;
    }
} 