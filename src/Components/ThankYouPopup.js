import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ThankYouPopup = ({ isOpen, onClose, name, phone }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">Thank You!</DialogTitle>
          <DialogDescription className="text-center pt-4">
            <p className="text-lg mb-4">
              Thank you, {name}! Our team will reach out to you at {phone}.
            </p>
            <p className="text-gray-600">
              We're excited to show you how NeoFlow Analytica can transform your clinic's marketing ROI.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouPopup;