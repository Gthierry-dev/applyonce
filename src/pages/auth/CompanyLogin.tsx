// ... existing code ...
        <Card className="w-full animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <img src="./2.png" alt="" className='rounded-md w-16' />
            </div>
            <CardTitle className="text-2xl">Company Login</CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Access your company dashboard
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              <SocialLoginButton 
                provider="google" 
                onClick={() => handleSocialLogin('google')} 
              />
              <SocialLoginButton 
                provider="linkedin" 
                onClick={() => handleSocialLogin('linkedin')} 
              />
            </div>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-2 text-xs text-muted-foreground">OR CONTINUE WITH EMAIL</span>
              </div>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus-visible:ring-[#447A79]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-[#447A79] hover:text-[#447A79]/80">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="focus-visible:ring-[#447A79]"
                />
              </div>
              <Button type="submit" className="w-full text-white bg-[#447A79] hover:bg-[#447A79]/90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : 'Log in'}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/company/register" className="text-[#447A79] hover:text-[#447A79]/80">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
// ... existing code ...