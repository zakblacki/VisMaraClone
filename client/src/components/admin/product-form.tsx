import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductFormProps {
  product?: Product | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    code: product?.code || "",
    name: product?.name || "",
    slug: product?.slug || "",
    description: product?.description || "",
    specifications: product?.specifications || "",
    image: product?.image || "speedGovernor",
    featured: product?.featured || false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Auto-generate slug when name changes
      ...(name === "name" && !product ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      featured: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = product
        ? `/api/products/${product.id}`
        : "/api/products";
      const method = product ? "PUT" : "POST";
      const token = localStorage.getItem("adminToken");

      const response = await fetch(endpoint, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      // Invalidate queries to refresh the product list
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la sauvegarde du produit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Code SKU *</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
            placeholder="ex: L0X-187"
            data-testid="input-product-code"
          />
        </div>
        <div>
          <Label htmlFor="name">Nom du produit *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="ex: Limiteur de Vitesse"
            data-testid="input-product-name"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="slug">URL Slug *</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          placeholder="ex: limitateur-velocita-240mm"
          data-testid="input-product-slug"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description du produit..."
          rows={3}
          data-testid="textarea-product-description"
        />
      </div>

      <div>
        <Label htmlFor="specifications">Spécifications</Label>
        <Textarea
          id="specifications"
          name="specifications"
          value={formData.specifications}
          onChange={handleChange}
          placeholder="Diamètre: ø 240 mm&#10;Vitesse: configurable&#10;Certification: CE"
          rows={4}
          data-testid="textarea-product-specifications"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Séparez chaque spécification par une nouvelle ligne
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // For now, store the filename. In production, upload to server
                setFormData((prev) => ({
                  ...prev,
                  image: file.name,
                }));
              }
            }}
            data-testid="input-product-image"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {formData.image && `Actuel: ${formData.image}`}
          </p>
        </div>
        <div className="flex items-end">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleCheckboxChange}
              data-testid="checkbox-product-featured"
            />
            <Label htmlFor="featured" className="font-normal cursor-pointer">
              Produit en vedette
            </Label>
          </div>
        </div>
      </div>

      <Card className="bg-muted/50 border-0">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            * Champs obligatoires
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-testid="button-cancel-product"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          data-testid="button-save-product"
        >
          {isSubmitting ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
