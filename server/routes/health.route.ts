import { Router } from 'express';
import { HealthService } from '../utils/health';

const router = Router();

// Health check endpoints
router.get('/health', HealthService.checkHealth);
router.get('/ready', HealthService.checkReadiness);
router.get('/metrics', HealthService.getMetrics);

// Cache management endpoints
router.get('/cache/stats', (req, res) => {
  try {
    const stats = HealthService['cache']?.getStats() || { keys: [], hits: 0, misses: 0 };
    res.status(200).json({
      success: true,
      stats: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to get cache stats',
    });
  }
});

router.post('/cache/clear', (req, res) => {
  try {
    HealthService['cache']?.clear();
    res.status(200).json({
      success: true,
      message: 'Cache cleared successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to clear cache',
    });
  }
});

export default router;