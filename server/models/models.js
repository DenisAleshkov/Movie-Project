const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Ticket = sequelize.define("ticket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TicketEvent = sequelize.define("ticket_event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Event = sequelize.define("event", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
});



const Location = sequelize.define("location", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const City = sequelize.define("city", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const EventInfo = sequelize.define("event_info", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
});

const CityLocation = sequelize.define("city_location", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Ticket);
Ticket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Ticket.hasMany(TicketEvent);
TicketEvent.belongsTo(Ticket);

Location.hasMany(Event);
Event.belongsTo(Location);

City.hasMany(Event);
Event.belongsTo(City);

Event.hasMany(Rating);
Rating.belongsTo(Event);

Event.hasMany(TicketEvent);
TicketEvent.belongsTo(Event);

Event.hasMany(EventInfo, { as: "info" });
EventInfo.belongsTo(Event);

Location.belongsToMany(City, { through: CityLocation });
City.belongsToMany(Location, { through: CityLocation });

module.exports = {
  User,
  Ticket,
  TicketEvent,
  Event,
  Location,
  City,
  Rating,
  CityLocation,
  EventInfo,
};
