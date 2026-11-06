import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Server, ShieldCheck, ExternalLink, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { isSupabaseConfigured, testSupabaseConnection } from '../../services/supabaseClient';

export const DatabaseConnectionStatus = () => {
  const isConfigured = isSupabaseConfigured();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
    } catch (err) {
      setTestResult({
        success: false,
        message: err.message || 'Connection test failed',
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="border-forest/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-forest" />
            <CardTitle>Supabase PostgreSQL Backend Architecture</CardTitle>
          </div>
          <Badge variant={isConfigured ? 'success' : 'mint'} dot={true}>
            {isConfigured ? 'Supabase Live Connected' : 'Local Demo Mode (Active)'}
          </Badge>
        </div>
        <CardDescription>
          Backend connection mode, schema migration tools, and Row Level Security (RLS) policies.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Status Box */}
        <div className="p-4 rounded-card bg-surface-subtle border border-border space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-muted-text block">
                Current Operational Mode
              </span>
              <p className="text-sm font-semibold text-charcoal mt-0.5">
                {isConfigured
                  ? 'Connected to Remote Supabase PostgreSQL Instance'
                  : 'High-Fidelity Local State Mode (Zero External Infrastructure Required)'}
              </p>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              iconLeft={RefreshCw}
              onClick={handleTestConnection}
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Connection'}
            </Button>
          </div>

          <p className="text-xs text-muted-text">
            {isConfigured
              ? 'All customer accounts, meal dispatches, invoices, and expenses are synchronized with your Supabase PostgreSQL cluster with Row Level Security enabled.'
              : 'TiffinOS is operating in self-contained mode. All actions (adding customers, dispatching meals, issuing invoices, recording payments) run locally with persistent state, allowing immediate family business use.'}
          </p>

          {testResult && (
            <div
              className={`p-3 rounded-button text-xs flex items-start gap-2 ${
                testResult.success
                  ? 'bg-emerald-50 border border-emerald-200 text-status-success'
                  : 'bg-amber-light/30 border border-amber/30 text-charcoal'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-status-success mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-dark mt-0.5" />
              )}
              <div>
                <p className="font-semibold">{testResult.message}</p>
                {testResult.latencyMs && (
                  <p className="text-[11px] text-muted-text mt-0.5">Response latency: {testResult.latencyMs}ms</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Database Architecture Spec */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded border border-border space-y-1">
            <span className="text-muted-text block font-medium">Schema Version</span>
            <span className="font-mono font-bold text-forest">20261106000000</span>
            <p className="text-[11px] text-muted-text">7 production tables with RLS</p>
          </div>

          <div className="p-3 bg-white rounded border border-border space-y-1">
            <span className="text-muted-text block font-medium">Data Integrity</span>
            <span className="font-bold text-charcoal flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
              Duplicate Constraints
            </span>
            <p className="text-[11px] text-muted-text">Unique slot & cycle indexes</p>
          </div>

          <div className="p-3 bg-white rounded border border-border space-y-1">
            <span className="text-muted-text block font-medium">Timezone Lock</span>
            <span className="font-bold text-charcoal">Asia/Kolkata (IST)</span>
            <p className="text-[11px] text-muted-text">Timestamps stored in IST</p>
          </div>
        </div>

        {/* Supabase Setup Guide Toggle */}
        <div className="pt-2 border-t border-border">
          <button
            type="button"
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="text-xs font-semibold text-forest hover:text-forest-deep flex items-center gap-1.5"
          >
            <Code className="w-3.5 h-3.5" />
            {showSqlGuide ? 'Hide Supabase Deployment Guide' : 'View Supabase Setup & Migration Guide'}
          </button>

          {showSqlGuide && (
            <div className="mt-3 p-4 bg-surface-subtle rounded-card border border-border text-xs space-y-3 animate-in fade-in">
              <p className="font-bold text-charcoal">How to connect your live Supabase database:</p>
              <ol className="list-decimal list-inside space-y-1.5 text-muted-text">
                <li>Create a free account and project at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-forest underline font-semibold">supabase.com</a>.</li>
                <li>Go to your project's <strong>SQL Editor</strong>.</li>
                <li>Copy and run the SQL migration located at <code className="bg-white px-1 py-0.5 rounded border border-border font-mono text-charcoal">supabase/migrations/20261106000000_init_tiffinos_schema.sql</code>.</li>
                <li>Copy your <strong>Project URL</strong> and <strong>Anon Key</strong> from Project Settings → API.</li>
                <li>Add them to your <code className="bg-white px-1 py-0.5 rounded border border-border font-mono text-charcoal">.env</code> file or Vercel environment variables as <code className="font-mono text-charcoal">VITE_SUPABASE_URL</code> and <code className="font-mono text-charcoal">VITE_SUPABASE_ANON_KEY</code>.</li>
              </ol>
            </div>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default DatabaseConnectionStatus;
