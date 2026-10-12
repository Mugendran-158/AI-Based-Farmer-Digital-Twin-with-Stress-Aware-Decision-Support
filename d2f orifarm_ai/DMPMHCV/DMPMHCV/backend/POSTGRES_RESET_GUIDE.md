# 🔐 How to Reset Your PostgreSQL Password

If the automated checker didn't find your password, you need to reset it.

## Method 1: The Easy Way (pgAdmin)
1. **Open "pgAdmin 4"** from your Start Menu.
2. Double-click **Servers** > **PostgreSQL 18** (or your version).
3. If it asks for a password and you don't know it, try Method 2.
4. If you are in:
   - Right-click **Login/Group Roles** > **postgres**.
   - Select **Properties** > **Definition**.
   - Enter a new password (e.g., `password123`).
   - Click **Save**.
   - **Your connection string:** `postgresql://postgres:password123@localhost:5432/farmer_twin`

## Method 2: The Command Line Way (PowerShell)
1. Open PowerShell **as Administrator**.
2. Run this command to navigate to the bin folder (verify version number `16` or `15`):
   ```powershell
   cd "C:\Program Files\PostgreSQL\18\bin"
   ```
3. Run this command to log in without a password (if local trust is enabled):
   ```powershell
   .\psql -U postgres
   ```
   *(If this asks for a password, you need to edit `pg_hba.conf` to set method to `trust` temporarily. Ask me if you need help with this).*
   
4. Once inside the `postgres=#` prompt, type:
   ```sql
   ALTER USER postgres WITH PASSWORD 'newpassword123';
   ```
5. Type `\q` to exit.

## Method 3: Reinstall (Hoping for the best)
If all else fails, uninstall PostgreSQL and reinstall it. **Pay attention** when it asks you to set a password during setup!
