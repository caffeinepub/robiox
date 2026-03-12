import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowLeft, Coins } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentFailure() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Payment Cancelled
        </h1>
        <p className="text-muted-foreground mb-8">
          Your payment was cancelled or failed. No charges were made. You can
          try again anytime.
        </p>
        <div className="flex gap-3 justify-center">
          <Link to="/">
            <Button variant="outline" data-ocid="payment_failure.home.button">
              <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
            </Button>
          </Link>
          <Link to="/robux">
            <Button
              className="bg-primary hover:bg-primary/90"
              data-ocid="payment_failure.retry.button"
            >
              <Coins className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
