import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
  reportId: {
    type: mongoose.ObjectId,
  },
  title: {
    type: String,
    required: [true, "Report's title is required"],
    minLength: [5, "Report's title should has at least 5 characters"],
    maxLength: [128, "Report's title should has no more than 5 characters"],
  },
  date: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  skyStatus: {
    type: String,
    enum: ['rain', 'sun', 'wind', 'snow', 'heavy-clouds', 'clouds'],
    default: 'sun',
  },
  shipStatus: {
    type: String,
    required: [true, 'Ship status must be entered'],
    enum: ['in harbor', 'at sea'],
    default: 'at sea',
  },
  windSpeed: {
    type: Number,
    default: 0,
    required: false,
  },
  shipLocalization: {
    type: String,
    required: false,
  },
  startHarbour: {
    type: String,
    required: false,
    default: '-',
  },
  destinationHarbour: {
    type: String,
    required: false,
    default: '-',
  },
  watchNumber: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7],
    default: 1,
  },
  watchOfficer: {
    type: String,
    required: false,
    default: '',
  },
  content: {
    type: String,
    required: false,
  },
});

const ReportModel = mongoose.model('Report', reportSchema);
export default ReportModel;
