import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { ProjectExists } from "../middleware/project";
import { TaskExists, taskBelongsToProject } from "../middleware/task";

const router = Router();

router.post(
  "/",

  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es Obligatoria"),

  handleInputErrors,
  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.getProjectByID
);

router.put(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  body("projectName")
    .notEmpty()
    .withMessage("El Nombre del Proyecto es Obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El Nombre del Cliente es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción del proyecto es Obligatoria"),
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  "/:id",
  param("id").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  ProjectController.deleteProject
);

/** Routes for Task */
router.param("projectId", ProjectExists);
router.post(
  "/:projectId/tasks",
  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.param("taskId",TaskExists)
router.param("taskId",taskBelongsToProject)
router.get(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El Nombre de la Tarea es Obligatorio"),
  body("description")
    .notEmpty()
    .withMessage("La descripción de la tarea es Obligatoria"),
  handleInputErrors,
  TaskController.updateTask
);



router.delete(
  "/:projectId/tasks/:taskId",
  param("taskId").isMongoId().withMessage("ID no válido"),
  handleInputErrors,
  TaskController.deleteTask
);


router.post('/:projectId/tasks/:taskId/status',
param("taskId").isMongoId().withMessage("ID no válido"),
  body('status').notEmpty().withMessage('El estado es Obligatorio'),
  handleInputErrors,
  TaskController.updateStatus
)

export default router;
