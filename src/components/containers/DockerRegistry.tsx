
import React from 'react';
import { Package, Download, Upload, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const registryImages = [
  { name: 'webapp/frontend', tag: 'v2.1.3', size: '145MB', pulls: '2.3k', pushed: '2h ago' },
  { name: 'api/gateway', tag: 'v1.8.1', size: '89MB', pulls: '1.8k', pushed: '5h ago' },
  { name: 'services/auth', tag: 'v2.5.4', size: '67MB', pulls: '943', pushed: '1d ago' },
  { name: 'tools/scanner', tag: 'v3.1.0', size: '234MB', pulls: '567', pushed: '3d ago' }
];

const registryStats = [
  { label: 'Total Images', value: '247', icon: Package },
  { label: 'Total Pulls', value: '12.4k', icon: Download },
  { label: 'Storage Used', value: '15.6GB', icon: Upload },
  { label: 'Active Tags', value: '89', icon: Tag }
];

export const DockerRegistry = () => {
  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Docker Registry</h3>
        <Button size="sm" variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Push Image
        </Button>
      </div>
      
      {/* Registry Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {registryStats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-lg bg-accent/20">
            <div className="flex items-center space-x-2 mb-1">
              <stat.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <div className="text-lg font-semibold text-foreground">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Images */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Recent Images</h4>
        <div className="space-y-2">
          {registryImages.map((image, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/10">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-foreground truncate">{image.name}</div>
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    {image.tag}
                  </span>
                  <span>{image.size}</span>
                  <span className="flex items-center">
                    <Download className="h-3 w-3 mr-1" />
                    {image.pulls}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {image.pushed}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
