import mongoose from 'mongoose';


const studyPlanSchema = new mongoose.Schema({
    planName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    specialConstraints: String,
    aiSuggestion: String,
},{ timestamps: true });


export default mongoose.model('StudyPlan', studyPlanSchema);