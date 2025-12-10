import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, ChevronLeft, ChevronRight, Loader2, Upload, Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { getProducts } from "@/lib/api";
import { getAuthHeaders } from "@/lib/queryClient";
import ProductForm from "./product-form";
import type { Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

const ITEMS_PER_PAGE = 10;

export default function AdminProducts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [isImporting, setIsImporting] = useState(false);
  const [importPreview, setImportPreview] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const filteredProducts = allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = async (productId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la suppression du produit");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) return;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedProducts.size} produit(s) ?`)) return;

    try {
      const response = await fetch("/api/products/bulk-delete", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify({ ids: Array.from(selectedProducts) }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setSelectedProducts(new Set());
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la suppression des produits");
    }
  };

  const toggleProductSelection = (id: number) => {
    setSelectedProducts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedProducts.size === paginatedProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(paginatedProducts.map((p) => p.id)));
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const parseCSV = (content: string): any[] => {
    const lines = content.split("\n").filter((line) => line.trim());
    if (lines.length < 2) return [];

    const headers = lines[0].split(";").map((h) => h.trim().toLowerCase());
    const products: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(";").map((v) => v.trim());
      const product: any = {};

      headers.forEach((header, index) => {
        const value = values[index] || "";
        switch (header) {
          case "code":
            product.code = value;
            break;
          case "name":
          case "nom":
            product.name = value;
            break;
          case "slug":
            product.slug = value;
            break;
          case "description":
            product.description = value;
            break;
          case "specifications":
            product.specifications = value;
            break;
          case "image":
            product.image = value;
            break;
          case "featured":
          case "vedette":
            product.featured = value.toLowerCase() === "true" || value === "1" || value.toLowerCase() === "oui";
            break;
          case "categoryid":
          case "category_id":
          case "categorie":
            if (value && !isNaN(parseInt(value))) {
              product.categoryId = parseInt(value);
            }
            break;
        }
      });

      if (product.name && !product.slug) {
        product.slug = generateSlug(product.name);
      }

      if (product.code && product.name && product.slug) {
        products.push(product);
      }
    }

    return products;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const parsed = parseCSV(content);
      setImportPreview(parsed);
    };
    reader.readAsText(file);
  };

  const handleImport = async () => {
    if (importPreview.length === 0) return;
    setIsImporting(true);

    try {
      const response = await fetch("/api/products/bulk-import", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify({ products: importPreview }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Erreur lors de l'importation");
      }

      const result = await response.json();
      toast({
        title: "Importation réussie",
        description: result.message,
      });

      setImportPreview([]);
      setIsImportDialogOpen(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de l'importation des produits",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = "code;name;description;specifications;image;featured;categoryId\nPROD-001;Nom du produit;Description du produit;Spécifications;https://example.com/image.jpg;false;";
    const blob = new Blob([template], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "produits_template.csv";
    link.click();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 w-full sm:w-auto">
          <Input
            placeholder="Rechercher par nom ou code..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            data-testid="input-search-products"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="outline" 
            onClick={async () => {
              try {
                const response = await fetch("/api/products/export", {
                  headers: getAuthHeaders(false),
                });
                if (!response.ok) throw new Error("Export failed");
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `produits_${new Date().toISOString().split("T")[0]}.csv`;
                link.click();
                URL.revokeObjectURL(url);
                toast({ title: "Export réussi", description: "Le fichier CSV a été téléchargé." });
              } catch (error) {
                toast({ title: "Erreur", description: "Échec de l'export", variant: "destructive" });
              }
            }}
            data-testid="button-export-csv"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </Button>
          <Dialog open={isImportDialogOpen} onOpenChange={(open) => {
            setIsImportDialogOpen(open);
            if (!open) {
              setImportPreview([]);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          }}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-import-products">
                <Upload className="h-4 w-4 mr-2" />
                Importer CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Importer des produits</DialogTitle>
                <DialogDescription>
                  Importez vos produits depuis un fichier CSV. Le fichier doit utiliser le point-virgule (;) comme séparateur.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={downloadTemplate} data-testid="button-download-template">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger le modèle
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fichier CSV</label>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.txt"
                    onChange={handleFileSelect}
                    data-testid="input-import-file"
                  />
                  <p className="text-xs text-muted-foreground">
                    Colonnes requises: code, name (ou nom). Colonnes optionnelles: slug, description, specifications, image, featured (ou vedette), categoryId
                  </p>
                </div>
                {importPreview.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="h-4 w-4" />
                      <span className="text-sm font-medium">{importPreview.length} produit(s) prêt(s) à importer</span>
                    </div>
                    <div className="overflow-x-auto border rounded-md max-h-60">
                      <table className="w-full text-xs">
                        <thead className="bg-muted">
                          <tr>
                            <th className="py-2 px-3 text-left">Code</th>
                            <th className="py-2 px-3 text-left">Nom</th>
                            <th className="py-2 px-3 text-left">Slug</th>
                            <th className="py-2 px-3 text-left">Vedette</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importPreview.slice(0, 10).map((p, i) => (
                            <tr key={i} className="border-t">
                              <td className="py-2 px-3 font-mono">{p.code}</td>
                              <td className="py-2 px-3">{p.name}</td>
                              <td className="py-2 px-3 text-muted-foreground">{p.slug}</td>
                              <td className="py-2 px-3">{p.featured ? "Oui" : "Non"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {importPreview.length > 10 && (
                        <div className="py-2 px-3 text-xs text-muted-foreground text-center bg-muted">
                          ... et {importPreview.length - 10} autre(s)
                        </div>
                      )}
                    </div>
                    <Button onClick={handleImport} disabled={isImporting} data-testid="button-confirm-import">
                      {isImporting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Importation...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Importer {importPreview.length} produit(s)
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAddNew} data-testid="button-add-product">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
                </DialogTitle>
              </DialogHeader>
              <ProductForm
                product={editingProduct}
                onClose={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <CardTitle>
            Produits ({filteredProducts.length})
          </CardTitle>
          {selectedProducts.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              data-testid="button-bulk-delete-products"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer ({selectedProducts.size})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 w-10">
                    <Checkbox
                      checked={paginatedProducts.length > 0 && selectedProducts.size === paginatedProducts.length}
                      onCheckedChange={toggleSelectAll}
                      data-testid="checkbox-select-all-products"
                    />
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Code</th>
                  <th className="text-left py-3 px-4 font-semibold">Nom</th>
                  <th className="text-left py-3 px-4 font-semibold">Catégorie</th>
                  <th className="text-left py-3 px-4 font-semibold">Vedette</th>
                  <th className="text-right py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <Checkbox
                        checked={selectedProducts.has(product.id)}
                        onCheckedChange={() => toggleProductSelection(product.id)}
                        data-testid={`checkbox-product-${product.id}`}
                      />
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">{product.code}</td>
                    <td className="py-3 px-4">
                      <div className="line-clamp-1">{product.name}</div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {product.categoryId ? "Assignée" : "—"}
                    </td>
                    <td className="py-3 px-4">
                      {product.featured ? (
                        <Badge>Oui</Badge>
                      ) : (
                        <Badge variant="outline">Non</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          data-testid={`button-edit-product-${product.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                          data-testid={`button-delete-product-${product.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {paginatedProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Aucun produit trouvé
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(Math.max(1, currentPage - 1));
                    setSelectedProducts(new Set());
                  }}
                  disabled={currentPage === 1}
                  data-testid="button-prev-page-products"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                    setSelectedProducts(new Set());
                  }}
                  disabled={currentPage === totalPages}
                  data-testid="button-next-page-products"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
