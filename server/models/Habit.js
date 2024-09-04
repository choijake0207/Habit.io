module.exports = (sequelize, DataTypes) => {
    const Habit = sequelize.define("Habit", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        streaks: {
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