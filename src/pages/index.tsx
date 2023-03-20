import { Suspense, useCallback, useState, useTransition } from "react";


export default function Home() {
  
  
  return (
    <Suspense fallback={<h1>🌀 Loading...</h1>}>
      Empty Project
    </Suspense>
  );
}
