import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddExpenseDialog: React.FC<AddExpenseDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter une Dépense</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="Ex: Courses Carrefour..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Montant</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="courses">Courses</SelectItem>
                <SelectItem value="restaurants">Restaurants</SelectItem>
                <SelectItem value="vetements">Vêtements</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="loisirs">Loisirs</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button variant="gradient" onClick={() => onOpenChange(false)}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseDialog;
