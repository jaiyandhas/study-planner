import express from 'express';
import { createStudyPlan, getStudyPlans, editStudyPlan, deleteStudyPlan} from '../controllers/studyPlanController.js'


const router = express.Router();


router.post('/studyplan', createStudyPlan);
router.get('/studyplans', getStudyPlans);
// Allow singular path so GET /api/studyplan won't 404
router.get('/studyplan', getStudyPlans);
// Use id param for edit/delete routes
router.put('/studyplan/:id', editStudyPlan);
router.delete('/studyplan/:id', deleteStudyPlan);


export default router;
