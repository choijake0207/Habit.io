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
        goalDuration: {
            type: DataTypes.INTEGER,
            allowNull: true
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