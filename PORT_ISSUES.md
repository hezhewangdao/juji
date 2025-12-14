# 端口访问问题诊断与解决方案

## 问题描述

在尝试访问 `localhost:3000` 或 `localhost:8080` 时遇到无法访问的问题。

## 诊断结果

通过系统检查发现以下情况：

1. 项目可以正常启动，Next.js 服务器已经在监听端口
2. 本地网络连接正常
3. 防火墙可能阻止了端口访问

## 解决方案

### 方案一：以管理员身份运行命令提示符（推荐）

1. 关闭当前运行的服务：
   ```
   Ctrl+C 或关闭终端窗口
   ```

2. 以管理员身份打开命令提示符（PowerShell）

3. 导航到项目目录：
   ```
   cd g:\project\juji
   ```

4. 启动开发服务器：
   ```
   npm run dev        # 默认使用 3000 端口
   # 或
   npm run dev:8080   # 使用 8080 端口
   ```

### 方案二：临时禁用 Windows Defender 防火墙（仅用于测试）

1. 打开"Windows 安全中心"
2. 点击"防火墙和网络保护"
3. 临时关闭防火墙（仅用于测试目的，测试完请重新开启）
4. 重启开发服务器

### 方案三：手动添加防火墙例外（需要管理员权限）

1. 以管理员身份打开命令提示符
2. 运行以下命令添加防火墙规则：
   ```
   netsh advfirewall firewall add rule name="Node.js 3000" dir=in action=allow protocol=TCP localport=3000
   netsh advfirewall firewall add rule name="Node.js 8080" dir=in action=allow protocol=TCP localport=8080
   ```

### 方案四：使用其他端口

如果上述方案都不行，可以尝试使用其他端口：

```bash
npx next dev -p 3001
# 或在 package.json 中添加新的脚本
```

## 验证端口是否被占用

使用以下命令检查端口占用情况：

```bash
netstat -ano | findstr ":3000"
netstat -ano | findstr ":8080"
```

如果端口被占用，可以使用 `taskkill /PID <进程ID>` 命令结束对应进程。

## 常见问题

### 1. 端口已被占用
如果出现端口占用的情况，可以：
- 更换端口号
- 结束占用端口的进程

### 2. 权限不足
Windows 防火墙可能会阻止本地开发服务器的访问，需要以管理员权限运行或添加防火墙例外。

### 3. 网络配置问题
某些情况下，可能需要检查网络配置或重置网络设置。

## 项目端口配置

本项目支持以下端口运行方式：

- `npm run dev` - 在 3000 端口运行
- `npm run dev:8080` - 在 8080 端口运行

访问地址：
- 本地访问: http://localhost:3000 或 http://localhost:8080
- 网络访问: http://192.168.31.111:3000 或 http://192.168.31.111:8080