import StudyPlan from '../models/StudyPlan.js';


export const createStudyPlan = async (req, res) => {
    console.log('createStudyPlan called');
    console.log('Request body:', req.body);
    const { planName, startDate, endDate, description, specialConstraints, aiSuggestion } = req.body;

    if (!planName || !startDate || !endDate || !description) {
        return res.status(400).json({ message: 'Please provide all required fields: planName, startDate, endDate and description.' });
    }

    try {
        const newStudyPlan = new StudyPlan({
            planName,
            startDate,
            endDate,
            description,
            specialConstraints,
            aiSuggestion
        });
        const savedPlan = await newStudyPlan.save();
        return res.status(201).json({ message: 'plan created successfully', plan: savedPlan });

    } catch (error) {
        console.error('Error in createStudyPlan:', error);
        return res.status(500).json({ message: 'Error creating study plan', error: error.message });
    }
}
export const getStudyPlans = async (req, res) => {
    try{
        const plan = await StudyPlan.find().sort({createdAt: -1});
        return res.status(200).json({message: "plan retrieved successfully", plan});
    } catch (error) {
        console.error('Error in getStudyPlans:', error);
        return res.status(500).json({ message: 'Error retrieving study plans', error: error.message });
    }
}
export const editStudyPlan = async (req, res) => {
    const { id } = req.params;
    const { planName, startDate, endDate, description, specialConstraints, aiSuggestion } = req.body;
    try {
        const ifexist = await StudyPlan.findById(id);
        if(!ifexist){
            return res.status(404).json({ message: 'Study plan not found' });
        }

        const updatedPlan = await StudyPlan.findByIdAndUpdate(id, {
            planName,
            startDate,
            endDate,
            description,
            specialConstraints,
            aiSuggestion
        }, { new: true });

        return res.status(200).json({message: "plan updated successfully", updatedPlan});
    } catch (error) {
        console.error('Error in editStudyPlan:', error);
        return res.status(500).json({ message: 'Error editing study plan', error: error.message });
    }
}

export const deleteStudyPlan = async (req, res) => {
    const { id } = req.params;
    try {
        const ifexist = await StudyPlan.findById(id);
        if(!ifexist){
            return res.status(404).json({ message: 'Study plan not found' });
        }

        const deletedPlan = await StudyPlan.findByIdAndDelete(id);
        return res.status(200).json({message: "plan deleted successfully", deletedPlan});
    } catch (error) {
        console.error('Error in deleteStudyPlan:', error);
        return res.status(500).json({ message: 'Error deleting study plan', error: error.message });
    }
}



