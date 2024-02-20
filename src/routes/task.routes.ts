import { Router, Request, Response } from 'express';
import { Task } from '../models/task.model';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: 'Failed to create task', error: error.message });
    } else {
      res.status(400).json({ message: 'Failed to create task', error: 'Unknown error' });
    }
  }
});

router.get('/', async (_, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to retrieve tasks', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to retrieve tasks', error: 'Unknown error' });
    }
  }
});


router.put('/:id', async (req: Request, res: Response) => {
  try {
    const [updated] = await Task.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: "Task not found" });
    const task = await Task.findByPk(req.params.id);
    res.json(task);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: 'Failed to update task', error: error.message });
    } else {
      res.status(400).json({ message: 'Failed to update task', error: 'Unknown error' });
    }
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.status(204).end();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Failed to delete task', error: error.message });
    } else {
      res.status(500).json({ message: 'Failed to delete task', error: 'Unknown error' });
    }
  }
});

export default router;
