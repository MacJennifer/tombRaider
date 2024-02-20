<?php

namespace App\Console\Commands;

use App\Models\Role;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        $adminRole = Role::where('nameRoles', 'administrateur')->first();
        // dd($adminRole);
        $email = $this->ask('Enter admin email');
        $password = $this->secret('Enter password');

        // Utilisation de la classe User du modèle plutôt que de la classe User du service d'authentification
        $admin = User::create([

            'pseudoUsers' => 'admin',
            'email' => $email,
            'password' => Hash::make($password),
            'role_id' => 2,


        ]);

        $admin->role()->associate($adminRole);
        $admin->save();
        $this->info('Admin created successfully!');
    }
}
