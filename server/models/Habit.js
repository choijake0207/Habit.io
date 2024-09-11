module.exports = (sequelize, DataTypes) => {
    const Habit = sequelize.define("Habit", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        streaks: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        creationDate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pauseDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("ongoing", "paused", "completed"),
            allowNull: false,
            defaultValue: "ongoing"
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pauseDuration: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 0
        },
        currentGoal: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        goals: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        }
    })
    Habit.associate = (models) => {
        Habit.belongsTo(models.User, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        })
    }
    return Habit
}