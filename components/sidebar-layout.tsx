'use client';

import { Code2, Key, Plus, Server, Settings, Wrench } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useCodes } from '@/hooks/use-codes';

import { ProfileSwitcher } from './profile-switcher';
import { ProjectSwitcher } from './project-switcher';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { codes, createCode } = useCodes();
  const [open, setOpen] = React.useState(false);
  const [fileName, setFileName] = React.useState('');

  const handleCreateCode = async () => {
    if (fileName.trim()) {
      await createCode(fileName, '');
      setFileName('');
      setOpen(false);
    }
  };

  return (
    <SidebarProvider>
      <div className='flex flex-1 h-screen'>
        {/* Main Sidebar */}
        <Sidebar collapsible='none' className='w-64 flex-shrink-0 border-r'>
          <SidebarHeader className='flex flex-col justify-center items-center px-2 py-4'>
            <div className='flex items-center gap-4 mb-2'>
              <Image
                src='/favicon.ico'
                alt='MetaTool Logo'
                width={256}
                height={256}
                className='h-12 w-12'
              />
              <h2 className='text-2xl font-semibold'>MetaTool</h2>
            </div>
            <ProjectSwitcher />
            <ProfileSwitcher />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/mcp-servers'>
                        <Server className='mr-2 h-4 w-4' />
                        <span>MCP Servers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/custom-mcp-servers'>
                        <Wrench className='mr-2 h-4 w-4' />
                        <span>Custom MCP Servers</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/editor'>
                        <Code2 className='mr-2 h-4 w-4' />
                        <span>Code Editor</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/api-keys'>
                        <Key className='mr-2 h-4 w-4' />
                        <span>API Keys</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/settings'>
                        <Settings className='mr-2 h-4 w-4' />
                        <span>Settings</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Secondary Sidebar */}
        {pathname?.startsWith('/editor') && (
          <Sidebar collapsible='none' className='w-64 flex-shrink-0 border-r'>
            <SidebarHeader className='h-16 flex items-center px-4 mt-4'>
              <h2 className='text-lg font-semibold'>Code Files</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Files</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                          <SidebarMenuButton>
                            <Plus className='h-4 w-4 mr-2' />
                            <span>New Code File</span>
                          </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Create New Code File</DialogTitle>
                            <DialogDescription>
                              Enter a name for your new code file.
                            </DialogDescription>
                          </DialogHeader>
                          <div className='py-4'>
                            <Input
                              value={fileName}
                              onChange={(e) => setFileName(e.target.value)}
                              placeholder='Enter file name'
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleCreateCode();
                                }
                              }}
                            />
                          </div>
                          <DialogFooter>
                            <Button
                              variant='outline'
                              onClick={() => setOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleCreateCode}>Create</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </SidebarMenuItem>
                    {codes.map((code) => (
                      <SidebarMenuItem key={code.uuid}>
                        <SidebarMenuButton asChild>
                          <Link href={`/editor/${code.uuid}`}>
                            <Code2 className='mr-2 h-4 w-4' />
                            <span>{code.fileName}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        )}

        {/* Main Content Area */}
        <SidebarInset className='flex-grow'>
          <main className='h-full overflow-auto'>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
