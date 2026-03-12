import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { CheckCircle, Coins, Home } from "lucide-react";
import { motion } from "motion/react";

export default function PaymentSuccess() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-2">
          Purchase Successful!
        </h1>
        <p className="text-muted-foreground mb-6">
          Your Robux have been added to your account. Time to spend them!
        </p>
        <div className="flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-6 py-4 mb-8">
          <Coins className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-bold">
            Robux added to your wallet
          </span>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/robux">
            <Button variant="outline" data-ocid="payment_success.robux.button">
              <Coins className="h-4 w-4 mr-2" /> Buy More
            </Button>
          </Link>
          <Link to="/">
            <Button
              className="bg-primary hover:bg-primary/90"
              data-ocid="payment_success.home.button"
            >
              <Home className="h-4 w-4 mr-2" /> Go Home
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
