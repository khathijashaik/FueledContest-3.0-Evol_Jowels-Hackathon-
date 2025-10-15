import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCelebritySchema, insertProductSchema, insertSurveyResponseSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============== CELEBRITY ROUTES ==============
  
  // Get all celebrities
  app.get("/api/celebrities", async (req, res) => {
    try {
      const celebrities = await storage.getAllCelebrities();
      res.json(celebrities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch celebrities" });
    }
  });

  // Get celebrities by style
  app.get("/api/celebrities/style/:style", async (req, res) => {
    try {
      const { style } = req.params;
      const celebrities = await storage.getCelebritiesByStyle(style);
      res.json(celebrities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch celebrities by style" });
    }
  });

  // Create celebrity (admin)
  app.post("/api/celebrities", async (req, res) => {
    try {
      const validatedData = insertCelebritySchema.parse(req.body);
      const celebrity = await storage.createCelebrity(validatedData);
      res.status(201).json(celebrity);
    } catch (error) {
      res.status(400).json({ error: "Invalid celebrity data" });
    }
  });

  // ============== PRODUCT ROUTES ==============
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const { style, occasion, minPrice, maxPrice } = req.query;
      
      const filters = {
        style: style as string | undefined,
        occasion: occasion as string | undefined,
        minPrice: minPrice ? parseInt(minPrice as string) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
      };

      const products = await storage.getProductsByFilters(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Create product (admin)
  app.post("/api/products", async (req, res) => {
    try {
      const validatedData = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Invalid product data" });
    }
  });

  // ============== SURVEY ROUTES ==============
  
  // Submit survey response
  app.post("/api/survey", async (req, res) => {
    try {
      const validatedData = insertSurveyResponseSchema.parse(req.body);
      const response = await storage.createSurveyResponse(validatedData);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ error: "Invalid survey data" });
    }
  });

  // Get survey analytics (admin)
  app.get("/api/survey/analytics", async (req, res) => {
    try {
      const responses = await storage.getSurveyResponses();
      
      // Calculate analytics
      const analytics = {
        totalResponses: responses.length,
        popularStyles: calculatePopularChoices(responses.map(r => r.style)),
        popularOccasions: calculatePopularChoices(responses.map(r => r.occasion)),
        averageBudget: calculateAverageBudget(responses),
        topCelebrities: calculatePopularChoices(responses.map(r => r.matchedCelebrity)),
      };
      
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // ============== AI MATCHING ROUTE ==============
  
  // Get celebrity match based on survey answers
  app.post("/api/match", async (req, res) => {
    try {
      const { style, occasion, budget, lifestyle } = req.body;
      
      // Simple matching logic (can be replaced with AI)
      let matchedCelebrity;
      
      if (style?.includes("Minimal")) {
        matchedCelebrity = "Zendaya";
      } else if (style?.includes("Bold")) {
        matchedCelebrity = "Rihanna";
      } else if (style?.includes("Traditional")) {
        matchedCelebrity = "Priyanka Chopra";
      } else {
        matchedCelebrity = "Emma Stone";
      }
      
      res.json({
        celebrity: matchedCelebrity,
        matchPercentage: Math.floor(Math.random() * 10) + 90, // 90-100%
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to match celebrity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper functions
function calculatePopularChoices(items: (string | null | undefined)[]): Record<string, number> {
  const counts: Record<string, number> = {};
  items.forEach(item => {
    if (item) {
      counts[item] = (counts[item] || 0) + 1;
    }
  });
  return counts;
}

function calculateAverageBudget(responses: any[]): { min: number; max: number } {
  const validResponses = responses.filter(r => r.budgetMin && r.budgetMax);
  if (validResponses.length === 0) return { min: 0, max: 0 };
  
  const avgMin = validResponses.reduce((sum, r) => sum + r.budgetMin, 0) / validResponses.length;
  const avgMax = validResponses.reduce((sum, r) => sum + r.budgetMax, 0) / validResponses.length;
  
  return { min: Math.round(avgMin), max: Math.round(avgMax) };
}
