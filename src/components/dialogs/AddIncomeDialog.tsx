import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddIncomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddIncomeDialog: React.FC<AddIncomeDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ajouter un Revenu</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Source du revenu</Label>
            <Input placeholder="Ex: Salaire, Freelance..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Montant attendu</Label>
              <Input type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Date de paiement</Label>
              <Input type="date" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Compte de dépôt</Label>
            <Select>
              <SelectTrigger><SelectValue placeholder="Sélectionner un compte" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="principal">Compte Principal</SelectItem>
                <SelectItem value="epargne">Compte Épargne</SelectItem>
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

export default AddIncomeDialog;
