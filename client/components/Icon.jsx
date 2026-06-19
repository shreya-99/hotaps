'use client'

import {
  Server, Code2, Cloud, Smartphone, Apple, Layers,
  Rocket, Building2, Shield, BarChart2, MessageSquare, RefreshCw,
  Monitor, Database, Zap, Link2, Plug, Network,
  Box, GitBranch, Flame, Target, LayoutGrid, Code,
  Palette, FileCode, Gauge, Cpu, Lock, TrendingUp,
  Users, Headphones, Triangle, Leaf, Boxes, Workflow,
  TabletSmartphone,
  Phone, Mail, MapPin, CheckCircle2, AlertTriangle, Sparkles,
  PartyPopper, CheckCheck, Star,
} from 'lucide-react'

const MAP = {
  Server, Code2, Cloud, Smartphone, Apple, Layers,
  Rocket, Building2, Shield, BarChart2, MessageSquare, RefreshCw,
  Monitor, Database, Zap, Link2, Plug, Network,
  Box, GitBranch, Flame, Target, LayoutGrid, Code,
  Palette, FileCode, Gauge, Cpu, Lock, TrendingUp,
  Users, Headphones, Triangle, Leaf, Boxes, Workflow,
  TabletSmartphone,
  Phone, Mail, MapPin, CheckCircle2, AlertTriangle, Sparkles,
  PartyPopper, CheckCheck, Star,
}

export const Icon = ({ name, size = 22, className, style }) => {
  const LucideIcon = MAP[name]
  if (!LucideIcon) return null
  return <LucideIcon size={size} className={className} style={style} />
}
