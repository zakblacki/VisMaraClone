import { useState } from "react";
import { Plus, Trash2, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAuthHeaders } from "@/lib/queryClient";

interface PDFFile {
  id: number;
  name: string;
  url: string;
  uploadedAt: string;
  size: number;
}

export default function AdminPDFs() {
  const [pdfs, setPdfs] = useState<PDFFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPdfs, setSelectedPdfs] = useState<Set<number>>(new Set());

  // Fetch PDFs on mount
  useState(() => {
    fetch("/api/pdfs")
      .then((res) => res.json())
      .then((data) => {
        setPdfs(data.map((pdf: any) => ({
          id: pdf.id,
          name: pdf.name,
          url: pdf.url,
          uploadedAt: new Date(pdf.createdAt).toLocaleDateString("fr-FR"),
          size: 0, // Size not stored in DB yet
        })));
      })
      .catch(console.error);
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        if (file.type !== "application/pdf") {
          alert("Seuls les fichiers PDF sont acceptés");
          continue;
        }

        // Upload file using FormData
        const formData = new FormData();
        formData.append("pdf", file);
        formData.append("name", file.name);
        formData.append("type", "general");
        
        const headers = getAuthHeaders(false);
        const response = await fetch("/api/upload/pdf", {
          method: "POST",
          headers,
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erreur lors du téléchargement");
        }

        const data = await response.json();
        setPdfs((prev) => [
          ...prev,
          {
            id: data.id,
            name: data.name,
            url: data.url,
            uploadedAt: new Date().toLocaleDateString("fr-FR"),
            size: Math.round((data.size || 0) / 1024),
          },
        ]);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors du téléchargement du fichier");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce fichier ?")) return;

    try {
      const response = await fetch(`/api/pdfs/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(false),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setPdfs((prev) => prev.filter((pdf) => pdf.id !== id));
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la suppression du fichier");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPdfs.size === 0) return;
    if (!confirm(`Êtes-vous sûr de vouloir supprimer ${selectedPdfs.size} fichier(s) ?`)) return;

    try {
      const ids = Array.from(selectedPdfs);
      const response = await fetch("/api/pdfs/bulk-delete", {
        method: "POST",
        headers: getAuthHeaders(true),
        body: JSON.stringify({ ids }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      setPdfs((prev) => prev.filter((pdf) => !selectedPdfs.has(pdf.id)));
      setSelectedPdfs(new Set());
    } catch (error) {
      console.error("Error:", error);
      alert("Erreur lors de la suppression des fichiers");
    }
  };

  const togglePdfSelection = (id: number) => {
    setSelectedPdfs((prev) => {
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
    if (selectedPdfs.size === pdfs.length) {
      setSelectedPdfs(new Set());
    } else {
      setSelectedPdfs(new Set(pdfs.map((p) => p.id)));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-upload-pdf">
              <Plus className="h-4 w-4 mr-2" />
              Télécharger un PDF
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Télécharger un fichier PDF</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pdf-file">Sélectionner un fichier PDF</Label>
                <Input
                  id="pdf-file"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                  data-testid="input-pdf-file"
                />
              </div>
              {isUploading && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
          <div className="flex items-center gap-4">
            {pdfs.length > 0 && (
              <Checkbox
                checked={pdfs.length > 0 && selectedPdfs.size === pdfs.length}
                onCheckedChange={toggleSelectAll}
                data-testid="checkbox-select-all-pdfs"
              />
            )}
            <CardTitle>Fichiers PDF ({pdfs.length})</CardTitle>
          </div>
          {selectedPdfs.size > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              data-testid="button-bulk-delete-pdfs"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer ({selectedPdfs.size})
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {pdfs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucun fichier PDF téléchargé
            </div>
          ) : (
            <div className="space-y-2">
              {pdfs.map((pdf) => (
                <div
                  key={pdf.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50"
                >
                  <Checkbox
                    checked={selectedPdfs.has(pdf.id)}
                    onCheckedChange={() => togglePdfSelection(pdf.id)}
                    data-testid={`checkbox-pdf-${pdf.id}`}
                  />
                  <div className="flex-1">
                    <p className="font-medium">{pdf.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {pdf.size} KB • {pdf.uploadedAt}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      asChild
                      data-testid={`button-download-pdf-${pdf.id}`}
                    >
                      <a href={pdf.url} download>
                        <Download className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(pdf.id)}
                      data-testid={`button-delete-pdf-${pdf.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
